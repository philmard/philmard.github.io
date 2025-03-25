// Function to inject header content
function loadHeader() {
  const headerContent = `
      <!-- Header Section -->
      <header>
        <!-- Favicon Image (icon) -->
        <img src="/images/favicon.ico" alt="Favicon" class="favicon" />
        <h1>Filippos Marntirosian</h1>
        <p>Software Engineer | National Technical University of Athens</p>
        <!-- Home Button -->
        <button class="home-btn" onclick="redirectToIndex()">Home</button>
      </header>
    `;
  document.getElementById("header-container").innerHTML = headerContent;
}

// Function to redirect to index.html
function redirectToIndex() {
  window.location.href = "/index.html"; // Redirects to the index.html page
}

// Function to inject footer content
function loadFooter() {
  const footerContent = `
      <footer>
        <h2>Contact Me</h2>
        <p>Email: <a href="mailto:philipmardir@gmail.com">philipmardir@gmail.com</a></p>
        <p>GitHub: <a href="https://github.com/philmard">github.com/philmard</a></p>
      </footer>
    `;
  document.getElementById("footer-container").innerHTML = footerContent;
}

// Call the functions to load the header and footer on page load
window.onload = function () {
  // First, check and apply the theme preference from localStorage
  // const savedTheme = localStorage.getItem("theme");
  // //const button = document.querySelector(".toggle-btn");

  // if (savedTheme === "dark") {
  //   document.body.classList.add("dark-mode");
  //   //button.textContent = "🌞";
  // } else {
  //   document.body.classList.remove("dark-mode"); // Ensure  dark-mode is removed if not dark mode
  //   //button.textContent = "🌙";
  // }

  // Now load header and footer after the theme is applied
  loadHeader();
  loadFooter();

  // Optionally, fetch repositories if needed (if this is relevant for all pages)
  if (typeof fetchRepositories === "function") {
    fetchRepositories(); // If fetchRepositories exists, call it
  }
};
