export default async function handle(req, res) {
    req.body = JSON.parse(req.body);
    console.log(req.body)

    const resp = await fetch(process.env.SERVER_URL + `/api/story/${req.body.continu ? "continue" : "generate"}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...req.body
        })
    }).then(data => data.text())

    res.status(200).json({
        data: resp
    })
}