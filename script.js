const img = document.querySelector("img");
const button = document.querySelector("a");

fetch(
  "https://api.giphy.com/v1/gifs/translate?api_key=blZBBX96YFZI1VZ6wLWPZn0JcZSDCP1x&s=rabbit",
  { mode: "cors" }
)
  .then((response) => response.json())
  .then((obj) => {
    img.src = obj.data.images.original.url;
  })
  .catch((error) => console.log(error));

// Alternatively you can call this function, does the same as above
async function gifFetcher() {
  const response = await fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=blZBBX96YFZI1VZ6wLWPZn0JcZSDCP1x&s=rabbit",
    { mode: "cors" }
  );
  const obj = await response.json();

  img.src = obj.data.images.fixed_width.url;
}

button.addEventListener("click", (e) => {
  gifFetcher();
});
