export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Referer": url,
        "Origin": url
      },
    });

    if (!response.ok) {
      return res.status(response.status).send("Stream source error");
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/vnd.apple.mpegurl");

    response.body.pipe(res);

  } catch (err) {
    res.status(500).send("Proxy fetch failed");
  }
}
