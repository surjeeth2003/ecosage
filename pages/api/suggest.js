// pages/api/suggest.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { product_name } = req.body;
  if (!product_name || product_name.trim() === "") {
    return res.status(400).json({ error: "Product name is required" });
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return res.status(500).json({ error: "Missing OpenAI API key in environment" });
  }

  const prompt = `
You are EcoSage, an assistant that helps users find sustainable alternatives to everyday products.

Given the product name: "${product_name}", suggest 1–3 eco-friendly alternatives available online.
For each, include:
1. The product name
2. A one-sentence reason why it’s eco-friendly
3. A short product description (under 30 words)

Return only valid JSON in this format:
{
  "suggestions": [
    {
      "name": "Example",
      "reason": "Why it's sustainable",
      "description": "Short description"
    }
  ]
}
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: "OpenAI API error", details: errText });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content?.trim();

    let json;
    try {
      json = JSON.parse(text);
    } catch (err) {
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      if (start !== -1 && end !== -1) {
        const slice = text.slice(start, end + 1);
        json = JSON.parse(slice);
      } else {
        throw err;
      }
    }

    return res.status(200).json({ suggestions: json.suggestions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
}
