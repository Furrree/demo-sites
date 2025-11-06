// contact/script.js
const form = document.getElementById("leadForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    website: form.website.value,
    type: form.type.value,
    country: form.country.value,
    honeypot: form.honeypot.value,
  };

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      successMsg.style.display = "block";
      form.reset();
    } else {
      alert("Error: " + (result.error || "Something went wrong"));
    }
  } catch (err) {
    console.error("Form submission error:", err);
    alert("Network error. Please try again.");
  }
});
const result = await res.json();
if (result.success) {
  successMsg.style.display = "block";
  form.reset();
} else {
  alert("Error: " + (result.error || result.message || "Something went wrong"));
}
