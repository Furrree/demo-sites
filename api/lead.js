import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, error: "Method not allowed" });
    }

    // Read URL-encoded form data
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const rawBody = Buffer.concat(buffers).toString();

    // Forward to Google Apps Script
    const scriptRes = await fetch(
      "https://script.google.com/macros/s/AKfycbyiQzHS_ej22mjgwE8ignbq9OyNIt_OPlwxbekTpCxeIZ6bY2cntGXpXjoPxmSdnmd7/exec", // <-- replace with your script ID
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: rawBody,
      }
    );

    const text = await scriptRes.text();

    // Always return JSON
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch {
      return res.status(200).json({ success: false, error: text });
    }

  } catch (err) {
    console.error("Server error:", err);
    return res.status(200).json({ success: false, error: err.message });
  }
}
