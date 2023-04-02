// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getCharacters, setNarrative} from "../../database/database";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  const characters = await getCharacters();
  for (let i = 0; i < characters.length; i++) {
    req.body.characters[i] = characters.filter(a => a._id.toHexString() === req.body.characters[i])[0]
  }

  const data = await fetch(process.env.SERVER_URL + "/api/panel/descriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      story: req.body.story,
      characters: req.body.characters
    })
  }).then(data => data.json())

  await setNarrative(req.body._id, data, req.body.story)
  res.status(200).json({data})
}
