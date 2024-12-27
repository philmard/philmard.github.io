// Function to fetch and display IMDb ratings data from the CSV file
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

          // Categorize the movies based on their ratings
          const categorizedMovies = categorizeMoviesByRating(data);

          // Display the categorized data in the HTML
          displayIMDBData(categorizedMovies);
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

// Function to categorize movies by rating
function categorizeMoviesByRating(data) {
  const ratings = { 10: [], 9: [], 8: [], 7: [], "<7": [] };

  // Loop through each movie and categorize based on "Your Rating"
  data.forEach((item) => {
    const rating = parseFloat(item["Your Rating"]);
    if (rating >= 10) {
      ratings[10].push(item);
    } else if (rating >= 9) {
      ratings[9].push(item);
    } else if (rating >= 8) {
      ratings[8].push(item);
    } else if (rating >= 7) {
      ratings[7].push(item);
    } else {
      ratings["<7"].push(item);
    }
  });

  return ratings;
}

// Function to display the parsed IMDb data inside the table
function displayIMDBData(categorizedMovies) {
  const imdbTableDiv = document.getElementById("imdb-titles");

  // Clear any existing content
  imdbTableDiv.innerHTML = "";

  // Create the table structure
  const table = document.createElement("table");
  table.classList.add("rating-table");

  // Create the header row
  const headerRow = document.createElement("tr");
  const ratings = [10, 9, 8, 7, "<7"];
  ratings.forEach((rating) => {
    const th = document.createElement("th");
    th.innerText = rating;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Get the maximum number of movies in a column
  const maxMovies = Math.max(
    ...ratings.map((rating) => categorizedMovies[rating].length)
  );

  // Create the rows based on the maximum number of movies
  for (let i = 0; i < maxMovies; i++) {
    const row = document.createElement("tr");
    ratings.forEach((rating) => {
      const td = document.createElement("td");
      const movie = categorizedMovies[rating][i];
      if (movie) {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-item");

        // Create the movie HTML content
        let movieHTML = `
          <a href="${movie.URL}" target="_blank" class="movie-link">
            <div class="movie-item-content">
              <p class="imdb-title">${movie.Title}</p>
        `;

        // Only show "My Rating" for <7 movies
        if (rating === "<7") {
          movieHTML += `<p class="imdb-your-rating"><strong>My Rating:</strong> ${movie["Your Rating"]}</p>`;
        }

        movieHTML += `
            </div>
          </a>
        `;

        movieElement.innerHTML = movieHTML;
        td.appendChild(movieElement);
      }
      row.appendChild(td);
    });
    table.appendChild(row);
  }

  // Append the table to the IMDb titles div
  imdbTableDiv.appendChild(table);
}

// Call the function to fetch and display the data
fetchAndDisplayIMDBData();
