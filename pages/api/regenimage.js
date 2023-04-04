// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {addPanel, setPanel} from "../../database/database";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  let data = await fetch(process.env.SERVER_URL + "/api/panel/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...req.body
    })
  }).then(data => data.text())

  if (data.startsWith("b'"))
    data = data.substring(2, data.length - 1)

  await setPanel(req.body.id, req.body.i, data)
  res.status(200).json({base64: data})
}
