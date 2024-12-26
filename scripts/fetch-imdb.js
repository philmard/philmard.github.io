document.addEventListener("DOMContentLoaded", function () {
  // IMDb ratings URL
  const imdbUrl =
    "https://www.imdb.com/user/ur89250642/ratings/?sort=top_rated%2Cdesc";

  // Container to hold the IMDb titles
  const imdbContainer = document.getElementById("imdb-titles");

  // Check if the container exists
  if (!imdbContainer) {
    console.error("Error: IMDb container not found");
    return;
  }

  // Fetch the IMDb page HTML
  fetch(imdbUrl)
    .then((response) => response.text())
    .then((htmlText) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");

      // Extract movie details from the page
      const titleElements = doc.querySelectorAll("div.lister-item");

      // Check if there are any movie elements
      if (titleElements.length === 0) {
        imdbContainer.innerHTML =
          "<p>No ratings found. Please check the IMDb URL.</p>";
        return;
      }

      let outputHtml = "";

      // Loop through the movie elements and extract necessary details
      titleElements.forEach((element) => {
        const titleElement = element.querySelector(".lister-item-header a");
        const yearElement = element.querySelector(".lister-item-year");
        const ratingElement = element.querySelector(".ipl-rating-star__rating");
        const posterElement = element.querySelector(".lister-item-image img");
        const plotElement = element.querySelector(".lister-item-summary");

        const title = titleElement
          ? titleElement.textContent.trim()
          : "Unknown Title";
        const year = yearElement
          ? yearElement.textContent.trim()
          : "Unknown Year";
        const imdbRating = ratingElement
          ? ratingElement.textContent.trim()
          : "N/A";
        const posterUrl = posterElement ? posterElement.src : "";
        const plot = plotElement
          ? plotElement.textContent.trim()
          : "No description available.";

        // Append the extracted data to the output HTML
        outputHtml += `
            <div class="imdb-title">
              <img src="${posterUrl}" alt="${title}" class="imdb-poster" />
              <div class="imdb-details">
                <h3>${title} (${year})</h3>
                <p><strong>IMDb Rating:</strong> ${imdbRating}</p>
                <p><strong>Plot:</strong> ${plot}</p>
              </div>
            </div>
          `;
      });

      // Inject the movie details into the container
      imdbContainer.innerHTML = outputHtml;
    })
    .catch((error) => {
      console.error("Error fetching IMDb data:", error);
      imdbContainer.innerHTML = "<p>Error fetching IMDb data.</p>";
    });
});
// GraphQL query to get information about the movie "Oppenheimer"
const query = `
  {
    title(id: "tt15398776") {
      id
      type
      primary_title
      plot
      genres
      rating {
        aggregate_rating
        votes_count
      }
    }
  }
`;

// Endpoint for the GraphQL API
const apiUrl = "https://graph.imdbapi.dev/v1";

// Function to fetch data from the IMDb GraphQL API
async function fetchIMDbData() {
  try {
    // Make the fetch request to the GraphQL API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    });

    // Parse the JSON response
    const data = await response.json();

    // Check if the data has been returned correctly
    if (data && data.data && data.data.title) {
      const movie = data.data.title;
      displayMovieData(movie);
    } else {
      console.error("No data found for the movie.");
      document.getElementById("imdb-titles").innerHTML =
        "<p>Error: Movie data not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching IMDb data:", error);
    document.getElementById("imdb-titles").innerHTML =
      "<p>Error fetching IMDb data.</p>";
  }
}

// Function to display movie data in the HTML
function displayMovieData(movie) {
  const imdbContainer = document.getElementById("imdb-titles");

  // Create HTML content for displaying movie info
  const movieContent = `
    <h2>${movie.primary_title} (${movie.type})</h2>
    <p><strong>Plot:</strong> ${movie.plot}</p>
    <p><strong>Genres:</strong> ${movie.genres.join(", ")}</p>
    <p><strong>IMDb Rating:</strong> ${
      movie.rating.aggregate_rating
    } (Based on ${movie.rating.votes_count} votes)</p>
  `;

  // Inject the content into the container
  imdbContainer.innerHTML = movieContent;
}

// Fetch the IMDb data on page load
document.addEventListener("DOMContentLoaded", fetchIMDbData);
