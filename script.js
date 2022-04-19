// Query selectors
const searchBar = document.querySelector("input");
const gif = document.querySelector("img");
const searchButton = document.querySelector("a");

// Global variables
let searchURL =
  "https://api.giphy.com/v1/gifs/translate?api_key=blZBBX96YFZI1VZ6wLWPZn0JcZSDCP1x&s=rabbit";
let searchTerm;

// Get gif from api
fetch(searchURL, { mode: "cors" })
  .then((response) => response.json())
  .then((obj) => {
    gif.src = obj.data.images.original.url;
  })
  .catch((error) => console.log(error));

// Alternatively you can call this function, does the same as above
async function gifFetcher() {
  const response = await fetch(searchURL, { mode: "cors" });
  const obj = await response.json();

  gif.src = obj.data.images.fixed_width.url;
}

// Event listeners
searchBar.addEventListener("input", (e) => {
  searchTerm = e.target.value.trim();

  if (searchTerm === "") {
    searchButton.textContent = "GIVE ME ";
    return;
  }

  searchURL = `https://api.giphy.com/v1/gifs/translate?api_key=blZBBX96YFZI1VZ6wLWPZn0JcZSDCP1x&s=${searchTerm}`;
  searchButton.textContent = `GIVE ME ${searchTerm.toUpperCase()}`;
});

searchBar.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    gifFetcher();
    searchButton.textContent = `GIVE ME ANOTHER ${searchTerm.toUpperCase()}`;
  }
});

searchButton.addEventListener("click", (e) => {
  gifFetcher();
  searchButton.textContent = `GIVE ME ANOTHER ${searchTerm.toUpperCase()}`;
});
