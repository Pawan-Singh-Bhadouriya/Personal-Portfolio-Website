const scriptURL =
  "https://script.google.com/macros/s/AKfycbzk6gLfHQqEkokHLpVYEbdv8TdrKvom120dy3owcfYPG3DI6Zs-94VL9N9HSdYJxNuk/exec";

const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");
const toast = document.getElementById("toast");

function showToast(message, type = "success") {
  // Clear previous classes
  toast.classList.remove("show", "error", "success");
  
  if (type === "error") {
    // Show error icon + message in red
    toast.innerHTML = `<span class="icon">❌</span> ${message}`;
    toast.classList.add("error", "show");
  } else {
    // Normal message (success)
    toast.textContent = message;
    toast.classList.add("success", "show");
  }
  
  setTimeout(() => {
    toast.classList.remove("show", "error", "success");
    toast.innerHTML = ""; // clear content
  }, 3000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      showToast("Message sent successfully", "success");
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      showToast("Error sending message", "error");
    });
});
