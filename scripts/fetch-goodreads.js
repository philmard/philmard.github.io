document.addEventListener("DOMContentLoaded", function () {
  const goodreadsRSSFeedUrlRead = `https://www.goodreads.com/review/list_rss/180241574-filippos-marntirosian?shelf=read`;
  const goodreadsRSSFeedUrlCurrentlyReading = `https://www.goodreads.com/review/list_rss/180241574-filippos-marntirosian?shelf=currently-reading`;

  const booksContainerRead = document.getElementById("read-books");
  const booksContainerCurrentlyReading = document.getElementById(
    "currently-reading-books"
  );

  // Check if book containers exist
  if (!booksContainerRead || !booksContainerCurrentlyReading) {
    console.error("Error: one or both book containers not found");
    return;
  }

  // Fetch and parse the Goodreads RSS feeds for both "read" and "currently-reading" books
  Promise.all([
    fetchRSSFeed(goodreadsRSSFeedUrlRead),
    fetchRSSFeed(goodreadsRSSFeedUrlCurrentlyReading),
  ])
    .then(([readBooksData, currentlyReadingBooksData]) => {
      if (readBooksData.status === "ok") {
        displayBooks(readBooksData.items, booksContainerRead);
      } else {
        booksContainerRead.innerHTML =
          "<p>Unable to fetch 'read' books at this time.</p>";
      }

      if (currentlyReadingBooksData.status === "ok") {
        displayBooks(
          currentlyReadingBooksData.items,
          booksContainerCurrentlyReading
        );
      } else {
        booksContainerCurrentlyReading.innerHTML =
          "<p>Unable to fetch 'currently reading' books at this time.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching Goodreads books:", error);
      booksContainerRead.innerHTML = "<p>Error fetching Goodreads books.</p>";
      booksContainerCurrentlyReading.innerHTML =
        "<p>Error fetching Goodreads books.</p>";
    });

  // Fetch and parse an RSS feed
  function fetchRSSFeed(url) {
    return fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
    ).then((response) => response.json());
  }

  // Display books on the page
  function displayBooks(books, container) {
    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");

      const avgRating = extractAverageRatingFromContent(book.content);
      const imageUrl = extractImageFromContent(book.content);
      const author = extractAuthorFromContent(book.content);
      const myRating = extractMyRatingFromContent(book.content);

      const bookLink = document.createElement("a");
      bookLink.href = book.link;
      bookLink.target = "_blank";
      bookLink.classList.add("book-link");

      // Image column
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = book.title;
      img.classList.add("book-image");

      // Details column
      const details = document.createElement("div");
      details.classList.add("book-details");

      const title = document.createElement("p");
      title.classList.add("book-title");
      title.textContent = book.title;

      const meta = document.createElement("div");
      meta.classList.add("book-meta");
      meta.innerHTML = `
      <div class="rating">
        <p>Average Rating:</p>
        <p class="rating-number">${avgRating}</p>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${
            (avgRating / 5) * 100
          }%"></div>
        </div>
      </div>
      <div class="rating">
        <p>My Rating:</p>
        <p class="rating-number">${myRating}</p>
      </div>
      <p class="book-author">By ${author}</p>
    `;

      details.appendChild(title);
      details.appendChild(meta);

      bookLink.appendChild(img);
      bookLink.appendChild(details);

      bookElement.appendChild(bookLink);
      container.appendChild(bookElement);
    });
  }

  // Function to extract the first image URL from the content
  function extractImageFromContent(content) {
    const doc = new DOMParser().parseFromString(content, "text/html"); // Convert the content to HTML
    const img = doc.querySelector("img"); // Find the first image
    return img ? img.src : "images/goodreads/goodreads.jpg"; // Return the image src or a default image
  }

  // Function to extract the average rating from the content
  function extractAverageRatingFromContent(content) {
    // Use a regex to extract the average rating from the content
    const ratingMatch = content.match(/average rating:\s*(\d+(\.\d+)?)/i);
    return ratingMatch ? ratingMatch[1] : "N/A"; // Return the average rating or "N/A" if not found
  }

  // Function to extract the author from the content
  function extractAuthorFromContent(content) {
    // Use a regex to extract the author's name from the content
    const authorMatch = content.match(/author:\s*([^<]+)/i);
    return authorMatch ? authorMatch[1].trim() : "Unknown Author"; // Return the author's name or "Unknown Author" if not found
  }

  // Function to extract "My Rating" from the content
  function extractMyRatingFromContent(content) {
    // Use a regex to find all occurrences of "rating: X"
    const allRatings = content.match(/rating:\s*(\d+)/gi);

    // Return the second match if it exists, otherwise return "N/A"
    if (allRatings && allRatings.length >= 2) {
      const myRatingMatch = allRatings[1].match(/rating:\s*(\d+)/i);
      return myRatingMatch ? `${myRatingMatch[1]}` : "N/A";
    }

    return "N/A"; // Default to "N/A" if no valid second match is found
  }
});
