export default async function (req, res) {
    const response = await fetch('http://api.hackbackbetter.live/mailv1/webhook').then(response => response.text());
    res.send(response);
}