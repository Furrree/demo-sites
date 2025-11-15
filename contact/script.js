const form = document.getElementById("leadForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = new URLSearchParams(new FormData(form)).toString();

  try {
    const response = await fetch("/.netlify/functions/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    });

    const result = await response.json();

    if (result.success) {
      successMsg.style.display = "block";
      form.reset();
    } else {
      alert("Server error: " + result.error);
    }
  } catch (error) {
    console.error("Form submission error:", error);
    alert("Something went wrong. Please try again.");
  }
});
