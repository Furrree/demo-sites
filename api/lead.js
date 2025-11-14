import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    // Read raw URL-encoded form data
    let rawBody = "";
    for await (const chunk of req) rawBody += chunk;

    // Forward to Google Apps Script
    const scriptRes = await fetch(
      "https://script.google.com/macros/s/AKfycbyIXaOufN_byLhMzAjh3bTbaekJjcJ-ijnmxgyklOPw9BSIKChJ2a4YbqP8Fz4wY8Vh/exec", // <-- your Apps Script URL
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: rawBody,
      }
    );

    const text = await scriptRes.text();

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch {
      // If Apps Script returns plain text or error, return JSON
      return res.status(200).json({ success: false, error: text });
    }

  } catch (err) {
    console.error("Server error:", err);
    return res.status(200).json({ success: false, error: err.message });
  }
}
