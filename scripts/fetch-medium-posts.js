document.addEventListener("DOMContentLoaded", function () {
  // Load the RSS feed parser
  const mediumUsername = "philipmardir"; // Your Medium username
  const mediumFeedUrl = `https://medium.com/feed/@${mediumUsername}`;
  const postContainer = document.getElementById("medium-posts");

  // Check if postContainer exists
  if (!postContainer) {
    console.error("Error: postContainer not found");
    return;
  }

  // Fetch and parse the Medium RSS feed
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${mediumFeedUrl}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        displayPosts(data.items);
      } else {
        postContainer.innerHTML =
          "<p>Unable to fetch Medium posts at this time.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching Medium posts:", error);
      postContainer.innerHTML = "<p>Error fetching Medium posts.</p>";
    });

  // Display posts on the page
  function displayPosts(posts) {
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      // Create an anchor tag for the entire post
      const postLink = document.createElement("a");
      postLink.href = post.link;
      postLink.target = "_blank";
      postLink.classList.add("post-link"); // Add a class for styling the link

      // Extract the first image from the content description
      const imageUrl = extractImageFromDescription(post.description);

      // Set the background image if we found one
      if (imageUrl) {
        postElement.style.backgroundImage = `url(${imageUrl})`;
      } else {
        postElement.style.backgroundImage = "url('default-image.jpg')"; // Set a default image if no image is found
      }

      // Add content inside the anchor tag
      postLink.innerHTML = `
        <h3>${post.title}</h3>
      `;

      // Append the anchor tag to the post element
      postElement.appendChild(postLink);

      // Append the post to the container
      postContainer.appendChild(postElement);
    });
  }

  // Function to extract the first image URL from the description
  function extractImageFromDescription(description) {
    const doc = new DOMParser().parseFromString(description, "text/html"); // Convert the description to HTML
    const img = doc.querySelector("img"); // Find the first image
    return img ? img.src : null; // Return the image src or null if no image is found
  }
});
