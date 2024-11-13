// Function to toggle dark mode
function toggleDarkMode() {
  const button = document.querySelector(".toggle-btn");

  document.body.classList.toggle("dark-mode");

  // Save the current theme to localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    button.textContent = "☀️"; // Sun emoji when dark mode is on
  } else {
    localStorage.setItem("theme", "light");
    button.textContent = "☾"; // Moon emoji when light mode is on
  }
}
