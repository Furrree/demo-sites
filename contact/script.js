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
      alert("Error: " + result.error);
    }
  } catch (err) {
    alert("Something went wrong.");
    console.error(err);
  }
});
