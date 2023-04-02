// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {addComics} from "../../database/database";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  const id = await addComics(req.body.name, req.body.story, req.body.mood, req.body.location, req.body.style, req.body.characters);
  res.status(200).json({id})
}
