import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    // Read URL-encoded form data from client
    const body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => (data += chunk));
      req.on("end", () => resolve(data));
      req.on("error", err => reject(err));
    });

    // Forward to Google Apps Script
    const scriptRes = await fetch(
      "https://script.google.com/macros/s/AKfycbyIXaOufN_byLhMzAjh3bTbaekJjcJ-ijnmxgyklOPw9BSIKChJ2a4YbqP8Fz4wY8Vh/exec", // Replace with your Apps Script URL
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      }
    );

    // Google Apps Script returns JSON
    const text = await scriptRes.text();

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch {
      // If Apps Script returns plain text (error)
      return res.status(500).json({ success: false, error: text });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
