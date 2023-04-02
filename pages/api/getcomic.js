import {getComic} from "../../database/database";

export default async function handle(req, res) {
    res.status(200).json({
        data: await getComic(JSON.parse(req.body).id)
    })
}