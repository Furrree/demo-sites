import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let data = req.body;

      // If body is raw JSON string, parse it
      if (typeof data === "string") data = JSON.parse(data);

      // Convert to URLSearchParams for Google Apps Script
      const formData = new URLSearchParams(data).toString();

      const googleFormUrl = "https://script.google.com/macros/s/AKfycbw9J-T8zHJd4qstUJBh-qh9AsarXaNgvELs_8EJqUJeObdOav8k8XhrXUeqKPPAnVzb/exec";

      const response = await fetch(googleFormUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      const text = await response.text();
      res.status(200).json({ success: true, message: text });
    } catch (err) {
      console.error("Error in /api/lead:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
