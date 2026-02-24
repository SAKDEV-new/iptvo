export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": url
      }
    });

    res.setHeader("Access-Control-Allow-Origin", "*");

    response.body.pipe(res);

  } catch (err) {
    res.status(500).send("Error fetching stream");
  }
}
