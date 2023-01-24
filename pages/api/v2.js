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

async function emailto(email) {
	const token = `Bearer ${process.env.MAIL_KEY}`;
	const res = await fetch('https://api.hackbackbetter.live/mail/v1/authed/deliver/subscribe', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		},
		body: JSON.stringify({
			data: {
				email
			}
		})
	});
	const json = await res.json();
	console.log(json);
	return json;
}

export default async function (req, res) {
    const { email, city } = req.body;
    const dbPromise = dbConnect();
    const client = await dbPromise;
    const collection = client.db("primary").collection("subscriptions");
    const existingRecord = (await collection.findOne({
        Email: email
    }));
    if (existingRecord) return res.status(422).json({ message: "This email is already subscribed." });
    console.log("New subscription: " + email + " in " + city);
    console.log(await collection.insertOne({Email: email, City: city}));
    client.close();
    // Return 200 if everything is successful
    try {
        await emailto(email);
    } catch (err) {
        console.log("Email being weird wtf?");
        return res.status(422).json({ message: "We had trouble sending you an email. Please report this error." });
    }
    return res.status(200).send("OK");
}