// Fetching data from GitHub API
fetch("https://api.github.com/users/philmard/repos")
  .then((response) => response.json())
  .then((data) => {
    // Process the data here
    displayRepositoriesWithImages(data);

    // Add event listeners for carousel navigation
    document.querySelector(".prev-btn").addEventListener("click", function () {
      document.getElementById("repository-carousel").scrollLeft -= 300; // Adjust the scroll amount as needed
    });

    document.querySelector(".next-btn").addEventListener("click", function () {
      document.getElementById("repository-carousel").scrollLeft += 300; // Adjust the scroll amount as needed
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to display repositories with images
function displayRepositoriesWithImages(repositories) {
  const carouselContainer = document.getElementById("repository-carousel");

  // Iterate over repositories
  repositories.forEach((repo) => {
    // Create a slide for each repository
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");

    // Construct the path for the image using the repository name
    const imagePath = `url('images/${repo.name}.png')`; // Assuming images are PNG format

    // Construct the content of the slide with image as background
    slide.innerHTML = `
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
        <div class="carousel-img" style="background-image: ${imagePath};"></div>
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available"}</p>
        <p>Language: ${repo.language || "N/A"}</p>
        <p>Stars: ${repo.stargazers_count}</p>
      </a>
    `;

    // Append the slide to the carousel container
    carouselContainer.appendChild(slide);
  });
}
