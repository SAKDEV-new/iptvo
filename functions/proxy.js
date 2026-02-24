addEventListener("fetch", event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const url = new URL(request.url);
  const target = url.searchParams.get("url");
  if (!target) return new Response("Missing url", { status: 400 });

  try {
    const response = await fetch(target, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const { readable, writable } = new TransformStream();
    response.body.pipeTo(writable);
    return new Response(readable, {
      headers: { "Content-Type": response.headers.get("content-type") || "" },
    });
  } catch (err) {
    return new Response("Stream error", { status: 500 });
  }
}
