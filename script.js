// Query selectors
const body = document.body;
const searchBar = document.querySelector("input");
const gif = document.querySelector("img");
const searchButton = document.querySelector("a");

// Global variables
let searchURL =
  "https://api.giphy.com/v1/gifs/translate?api_key=blZBBX96YFZI1VZ6wLWPZn0JcZSDCP1x&s=rabbit";
let searchTerm = "rabbit";
const disabledButtonColor = "#757575";
const activeButtonColor = "#89023e";

// Get gif from api
fetch(searchURL, { mode: "cors" })
  .then((response) => response.json())
  .then((obj) => {
    gif.src = obj.data.images.original.url;
  })
  .catch((error) => console.log(error));

// This function does the same as above, but in a slightly different way
async function gifFetcher() {
  const response = await fetch(searchURL, { mode: "cors" });
  const obj = await response.json();

  gif.src = obj.data.images.original.url;
}

// Event listeners
searchBar.addEventListener("input", (e) => {
  searchTerm = e.target.value.trim();

  if (searchTerm === "") {
    searchButton.textContent = "NO SEARCH TERM :(";
    searchButton.style.backgroundColor = disabledButtonColor;
    searchButton.classList.remove("hover-on");
    searchButton.style.pointerEvents = "none";
  } else {
    searchURL = `https://api.giphy.com/v1/gifs/translate?api_key=blZBBX96YFZI1VZ6wLWPZn0JcZSDCP1x&s=${searchTerm}`;

    searchButton.innerHTML = `GIVE ME A <br /> "${searchTerm.toUpperCase()}" GIF`;
    searchButton.style.backgroundColor = activeButtonColor;
    searchButton.classList.add("hover-on");
    searchButton.style.pointerEvents = "auto";
  }
});

body.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    gifFetcher();
    searchButton.innerHTML = `GIVE ME ANOTHER <br /> "${searchTerm.toUpperCase()}" GIF`;
  }
});

searchButton.addEventListener("click", (e) => {
  gifFetcher();
  searchButton.innerHTML = `GIVE ME ANOTHER <br /> "${searchTerm.toUpperCase()}" GIF`;
});
