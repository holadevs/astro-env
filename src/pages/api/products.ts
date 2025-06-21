export async function GET(request: any) {
  const url = new URL(request.url);
  const apiKey = import.meta.env.PUBLIC_API_KEY;

  const apiUrl = `https://fakestoreapi.com/products?key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: true, message: errorText }), {
        status: 500,
      });
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        products: data,
        key: apiKey,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Server error:", err);
    return new Response(JSON.stringify({ error: true, message: err.message }), {
      status: 500,
    });
  }
}
