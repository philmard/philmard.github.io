// Function to scroll the carousel left or right
function scrollCarousel(direction) {
  const container = document.getElementById("activity-container");
  const scrollAmount = 300; // Amount to scroll per button click (adjust as needed)

  // Scroll the container by the defined amount
  container.scrollBy({
    left: direction * scrollAmount, // Negative for left, positive for right
    behavior: "smooth",
  });
}
