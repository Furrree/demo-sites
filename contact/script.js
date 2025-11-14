const form = document.getElementById("leadForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      body: new URLSearchParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const result = await response.json();

    if (result.success) {
      successMsg.style.display = "block";
      form.reset();
    } else {
      alert("Server error: " + result.error);
    }
  } catch (err) {
    console.error("Form submission error:", err);
    alert("Something went wrong. Please try again.");
  }
});
