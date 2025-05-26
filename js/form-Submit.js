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

// Function to formate the date in a particular formate
function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Disabling the submit button to prevent multiple submit
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  document.getElementById("formDate").value = getFormattedDate();

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      showToast("Message sent successfully", "success");
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      showToast("Error sending message", "error");
    })
    .finally(() => {
      // Re-enabling the button after response/error
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    });
});
