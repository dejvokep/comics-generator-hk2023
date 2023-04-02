import {getAllCollection} from "../../database/database";

export default async function handle(req, res) {
    res.status(200).json({
        data: await getAllCollection()
    })
}