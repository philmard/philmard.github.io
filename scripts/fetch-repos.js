// GitHub username
const githubUsername = "philmard";

// Fetch repositories and display them
async function fetchRepositories() {
  const repoContainer = document.getElementById("repo-container");

  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated`
    );

    if (!response.ok) {
      throw new Error(`Error fetching repositories: ${response.statusText}`);
    }

    const repos = await response.json();

    // Exclude repositories with the names "philmard.github.io" and "philmard"
    const filteredRepos = repos.filter(
      (repo) => repo.name !== "philmard.github.io" && repo.name !== "philmard"
    );

    // Clear existing content (if any)
    repoContainer.innerHTML = "";

    filteredRepos.forEach((repo) => {
      // Create a div for each repository
      const repoDiv = document.createElement("div");
      repoDiv.classList.add("project");

      // Add repository name and description
      repoDiv.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available."}</p>
                <p><a href="${
                  repo.html_url
                }" target="_blank">View on GitHub</a></p>
            `;

      // Append the repository div to the container
      repoContainer.appendChild(repoDiv);
    });
  } catch (error) {
    console.error(error);
    repoContainer.innerHTML = `<p>Unable to load repositories at this time.</p>`;
  }
}

// Load repositories on page load
window.onload = function () {
  fetchRepositories();

  // Check and apply the theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
};
