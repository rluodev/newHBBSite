import crypto from "crypto";


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
	const client = await dbPromise;
	const { body, method } = req;

	// Extract the data from the request body
	const { data } = body;

	if (method === "POST") {
		console.log(req.headers);
		const auth = req.headers['authorization'];
    	const valid = auth?.startsWith('Bearer hoc-m-') && ('HOC-M-' + crypto.createHash('sha512').update(auth.substring(13)).digest('hex')).toUpperCase() == 'HOC-M-BF12DDF078949BA5AC196FFF7D63F4EA2EE3065E09C4C1B6C7505C7C991D857E04373731A5E1D02966CF5DD006312FD8CD835BCCCEA3C69881837E2BBB080C83';
    	if (!valid) return res.status(401).send('Unauthorized');
		// If data is missing return an error
		const collection = client.db("primary").collection("signups");
		const users = await collection.find({"rejected": false}).toArray();
		let r = [];
		for (const user of users) {
			r.push(user['Email']);
		}
		return res.status(200).json(users);
	}
	// Return 404 if someone pings the API with a method other than
	// POST
	return res.status(404).send("Invalid method. please use POST");
}
