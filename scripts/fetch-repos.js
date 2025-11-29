// GitHub username
const githubUsername = "philmard";

// Fetch repositories and display them
async function fetchRepositories() {
  const personalRepoContainer = document.getElementById(
    "personal-repo-container"
  );
  const universityRepoContainer = document.getElementById(
    "university-repo-container"
  );

  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated`
    );

    if (!response.ok) {
      throw new Error(`Error fetching repositories: ${response.statusText}`);
    }

    const repos = await response.json();

    const filteredRepos = repos.filter(
      (repo) =>
        repo.name !== "philmard.github.io" &&
        repo.name !== "philmard" &&
        repo.name !== "theme-store" &&
        repo.name !== "choice-web" &&
        repo.name !== "SDEverywhere" &&
        repo.name !== "obsidian-plugin-static-cursor"
    );

    const universityRepoNames = new Set([
      "task-manager",
      "solveme",
      "ai",
      "os",
      "pps",
      "chordifly",
      "ntuaflix",
      "LMS",
      "8085",
    ]);

    const universityRepos = filteredRepos.filter((repo) =>
      universityRepoNames.has(repo.name)
    );

    const personalRepos = filteredRepos.filter(
      (repo) => !universityRepoNames.has(repo.name)
    );

    personalRepoContainer.innerHTML = "";
    universityRepoContainer.innerHTML = "";

    // Helper to render a repo into a container
    function renderRepo(repo, container, showStars = false) {
      const repoLink = document.createElement("a");
      repoLink.href = repo.html_url;
      repoLink.target = "_blank";
      repoLink.classList.add("repo-link");

      const repoDiv = document.createElement("div");
      repoDiv.classList.add("project");

      const hasStars = showStars && repo.stargazers_count > 0;

      const starsMarkup = hasStars
        ? `<span class="repo-stars">(${repo.stargazers_count}
        <svg class="repo-star-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.89a1 1 0 0 0-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.89a1 1 0 0 0-1.176 0l-3.976 2.89c-.784.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 0 0-.364-1.118l-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z"/>
        </svg>)
      </span>`
        : "";

      repoDiv.innerHTML = `
    <h3>${repo.name} ${starsMarkup}</h3>
    <p>${repo.description || "No description available."}</p>
  `;

      repoLink.appendChild(repoDiv);
      container.appendChild(repoLink);
    }

    personalRepos.forEach((repo) =>
      renderRepo(repo, personalRepoContainer, true)
    );

    universityRepos.forEach((repo) =>
      renderRepo(repo, universityRepoContainer, false)
    );
  } catch (error) {
    console.error(error);
    if (personalRepoContainer) {
      personalRepoContainer.innerHTML = `<p>Unable to load repositories at this time.</p>`;
    }
    if (universityRepoContainer) {
      universityRepoContainer.innerHTML = `<p>Unable to load repositories at this time.</p>`;
    }
  }
}
