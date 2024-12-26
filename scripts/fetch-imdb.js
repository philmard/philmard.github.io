// Function to fetch and display IMDb ratings data from the CSV file hosted on GitHub
function fetchAndDisplayIMDBData() {
  // Raw GitHub URL to the CSV file
  const csvUrl =
    "https://raw.githubusercontent.com/philmard/philmard.github.io/refs/heads/main/data/imdb/imdb.csv";

  // Fetch the CSV file
  fetch(csvUrl)
    .then((response) => response.text())
    .then((csvText) => {
      // Parse the CSV text using PapaParse
      Papa.parse(csvText, {
        header: true, // Use the first row as header
        skipEmptyLines: true, // Skip empty lines
        complete: function (results) {
          // The parsed data is available in results.data
          const data = results.data;

          // Sort the data by "Your Rating" in descending order
          data.sort((a, b) => b["Your Rating"] - a["Your Rating"]);

          // Display the sorted data in the HTML
          displayIMDBData(data);
        },
        error: function (error) {
          console.error("Error parsing CSV:", error);
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching the CSV file:", error);
    });
}

// Function to display the parsed IMDb data inside the #imdb-titles div
function displayIMDBData(data) {
  const imdbTitlesDiv = document.getElementById("imdb-titles");

  // Clear any existing content
  imdbTitlesDiv.innerHTML = "";

  // Iterate through each movie and create an HTML element for each one
  data.forEach((item) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-item");

    // Fix genres format to show all and remove extra quote
    const genres = item.Genres
      ? item.Genres.split(",")
          .map((genre) => genre.trim())
          .join(", ")
      : "N/A";

    // Create the HTML content for each movie
    const movieHTML = `
        <a href="${item.URL}" target="_blank" class="movie-link">
          <div class="movie-item-content">
            <p class="imdb-title">${item.Title}</p>
            <p class="imdb-rating"><strong>IMDb Rating:</strong> ${
              item["IMDb Rating"]
            }</p>
            <p class="imdb-your-rating"><strong>My Rating:</strong> ${
              item["Your Rating"]
            }</p>
            <p class="imdb-title-type"><strong>Title Type:</strong> ${
              item["Title Type"]
            }</p>
            <p class="imdb-year"><strong>Year:</strong> ${item.Year}</p>
            <p class="imdb-genres"><strong>Genres:</strong> ${genres}</p>
            <p class="imdb-directors"><strong>Directors:</strong> ${
              item.Directors ? item.Directors : "N/A"
            }</p>
          </div>
        </a>
      `;

    // Inject the movie HTML content into the movie element
    movieElement.innerHTML = movieHTML;

    // Append the movie element to the IMDb titles div
    imdbTitlesDiv.appendChild(movieElement);
  });
}

// Call the function to fetch and display the data
fetchAndDisplayIMDBData();
