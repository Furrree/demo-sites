const fetch = require("node-fetch");

exports.handler = async (event) => {
  // Allow browser requests
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Netlify preflight request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method not allowed" };
  }

  try {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyiQzHS_ej22mjgwE8ignbq9OyNIt_OPlwxbekTpCxeIZ6bY2cntGXpXjoPxmSdnmd7/exec";

    // Forward directly to Google Script
    const gsRes = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: event.body,
    });

    const text = await gsRes.text();

    let json;

    try {
      json = JSON.parse(text);
    } catch {
      json = { success: false, error: text };
    }

    return {
      statusCode: 200,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(json)
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
