import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = new URLSearchParams(req.body);
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbw9J-T8zHJd4qstUJBh-qh9AsarXaNgvELs_8EJqUJeObdOav8k8XhrXUeqKPPAnVzb/exec",
      {
        method: "POST",
        body: formData
      }
    );

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
