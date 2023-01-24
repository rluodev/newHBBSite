import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

const sleep = () => new Promise((resolve) => {
	setTimeout(() => {
		resolve();
	}, 350);
});

export function dbConnect() {
	return new Promise((resolve, reject) => {
		const { MongoClient, ServerApiVersion } = require('mongodb');
		const uri = process.env.MONGODB_URI;
		const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
		client.connect(err => {
			if (err) return reject(err);
			resolve(client);
			// perform actions on the collection object
		});
	});
}


export default async function handler(req, res) {
	const dbPromise = dbConnect();
	const { body, method } = req;

	// Extract the email and captcha code from the request body
	const { data } = body;

	if (method === "POST") {
		// If email or captcha are missing return an error
		if (!data) {
			return res.status(422).json({
				message: "Unproccesable request, please provide the required fields",
			});
		}

		try {
			/**
			 * The structure of response from the veirfy API is
			 * {
			 *  "success": true|false,
			 *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
			 *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
			 *  "error-codes": [...]        // optional
			  }
			 */
			console.log("Successful validation");
			console.log(data);
			// Replace this with the API that will save the data received
			// to your backend
			const client = await dbPromise;
			const collection = client.db("primary").collection("tokens");
			console.log(data);
			const existingRecord = (await collection.findOne({
				token: data["token"]
			}));
			console.log(existingRecord);
			if (!existingRecord) return res.status(422).json({ message: "Invalid login token." });
			const aSessions = client.db("primary").collection("sessions");
			const existingLogin = (await collection.findOne({
				aToken: data["token"]
			}));
			if (existingLogin && existingLogin["aDate"] + 600000 > new Date().valueOf()) return res.status(200).json({ message: existingLogin["cVal"] });
			if (existingLogin && existingLogin["aDate"] + 600000 <= new Date().valueOf()) {
				await aSessions.deleteOne({
					aToken: data["token"]
				});
			}
			const cookie = uuidv4();
			console.log(await aSessions.insertOne({ aToken: data["token"], cVal: cookie, aDate: new Date().valueOf() }));
			await client.close();
			return res.status(200).json({ message: cookie });
			// Return 200 if everything is successful
		} catch (error) {
			console.log(error);
			return res.status(422).json({ message: "Something went wrong" });
		}
	}
	// Return 404 if someone pings the API with a method other than
	// POST
	return res.status(404).send("Invalid method. please use POST");
}