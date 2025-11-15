const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  // Raw body as sent by HTML form
  const rawBody = event.body;

  const scriptUrl = "https://script.google.com/macros/s/AKfycbyiQzHS_ej22mjgwE8ignbq9OyNIt_OPlwxbekTpCxeIZ6bY2cntGXpXjoPxmSdnmd7/exec";

  try {
    const result = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: rawBody,
    });

    const text = await result.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: text, // Apps Script already returns JSON
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
