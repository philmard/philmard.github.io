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
      // Create an anchor element for the clickable repo
      const repoLink = document.createElement("a");
      repoLink.href = repo.html_url; // Link to GitHub repository
      repoLink.target = "_blank"; // Open in a new tab
      repoLink.classList.add("repo-link"); // Optional: for styling

      // Create a div for each repository
      const repoDiv = document.createElement("div");
      repoDiv.classList.add("project");

      // Add repository name and description
      repoDiv.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available."}</p>
      `;

      // Append the repository div to the anchor
      repoLink.appendChild(repoDiv);

      // Append the repoLink (which wraps the repoDiv) to the container
      repoContainer.appendChild(repoLink);
    });
  } catch (error) {
    console.error(error);
    repoContainer.innerHTML = `<p>Unable to load repositories at this time.</p>`;
  }
}
