import fetch from "node-fetch";

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

export default async function (req, res) {
	const dbPromise = dbConnect();
    const client = await dbPromise;
    const collection = client.db("primary").collection("signups");
	console.log(await collection.find({}));
	return res.status(200).json(await collection.find({}));
}
