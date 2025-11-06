const form = document.getElementById("leadForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      body: new URLSearchParams(data)
    });

    const result = await response.json();

    if (result.success) {
      successMsg.style.display = "block";
      form.reset();
    } else {
      alert("Error: " + (result.error || "Unknown error"));
    }
  } catch (err) {
    console.error("Form submission error:", err);
    alert("Something went wrong. Please try again.");
  }
});
