import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    // Read form data
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const rawBody = Buffer.concat(buffers).toString();

    // Forward to Google Apps Script
    const scriptRes = await fetch(
      "https://script.google.com/macros/s/AKfycbwUDQgcXyG7LchpsDk-HM-eHmfycGnIQGV9nkOYkMqZnpWHTal4loyWzL1nXpQLFHaf/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: rawBody,
      }
    );

    const text = await scriptRes.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({ success: false, error: text });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
