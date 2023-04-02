// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {addManualCharacter} from "../../database/database";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  const base64 = await fetch(process.env.SERVER_URL + "/api/character/picture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      character: {
        ...req.body
      }
    })
  })

  const id = await addManualCharacter(req.body.name, req.body.attributes, req.body.skin, req.body.hair, req.body.physical, req.body.clothes, await base64.text());
  res.status(200).json({id})
}
