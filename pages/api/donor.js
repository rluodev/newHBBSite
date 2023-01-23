export default async function (req, res) {
    const response = await fetch('https://bank.hackclub.com/api/v3/organizations/hackbackbetter/donations');
    const json = await response.json();
    res.send(json.filter(a => !a?.transaction?.tags?.filter(tag => tag.id == 'tag_a')?.[0]).sort(() => Math.random() - 0.5)[0]?.donor?.name);
}