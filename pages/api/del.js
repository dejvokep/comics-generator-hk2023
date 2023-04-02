// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {del} from "../../database/database";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  await del(req.body.id, req.body.comic);
  res.status(200).json({})
}
