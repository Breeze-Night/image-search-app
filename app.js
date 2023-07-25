document.addEventListener("DOMContentLoaded", function () {
  // store API key
  const accessKey = "9ZPsbviVtqYohMWN1m9Anc_mxPN8nxtqAphTRKxT01s";

  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const searchBtn = document.querySelector("#search-btn");
  const searchResults = document.querySelector(".search-results");
  const showMoreBtn = document.querySelector("#show-more-btn");

  let inputData = "";
  let page = 0;

  searchForm.addEventListener("submit", (e) => displayResults(e));

  showMoreBtn.addEventListener("click", showMoreImages);

  // Asyncronous function to fetch API
  async function searchImages() {
    inputData = searchInput.value;
    // get the data filtered by page and search query
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const res = await fetch(url);
    const data = await res.json();

    const results = data.results; // see unsplash docs

    // when on page one, display default
    if (page === 1) {
      searchResults.innerHTML = "";
    }

    // map the results (array) to apply these to each image (value)
    results.map((result) => {
      // create elements and their attributes
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      const imageTag = document.createElement("img");
      imageTag.src = result.urls.small;
      imageTag.alt = result.description;
      const anchorWrapper = document.createElement("div");
      anchorWrapper.classList.add("description");
      const anchor = document.createElement("a");
      anchor.href = result.links.html;
      anchor.target = "_blank";
      anchor.textContent = result.alt_description;

      // append elements per order
      imageWrapper.appendChild(imageTag);
      imageWrapper.appendChild(anchorWrapper);
      anchorWrapper.appendChild(anchor);

      searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
      showMoreBtn.style.display = "block";
    }
  }

  // function displayResults(e) {
  //   e.preventDefault();
  //   searchBtn.disabled = true;
  //   page = 1;
  //   searchImages();
  //   setTimeout(function () {
  //     searchBtn.disabled = false;
  //   }, 2000);
  // }

  // function showMoreImages() {
  //   showMoreBtn.disabled = true;
  //   searchImages();
  //   setTimeout(function () {
  //     showMoreBtn.disabled = false;
  //   }, 2000);
  // }

  function displayResults(e) {
    e.preventDefault();
    searchBtn.disabled = true;
    page = 1;
    searchImages()
      .then(() => {
        // Enable the button once the asynchronous operation is complete
        searchBtn.disabled = false;
      })
      .catch((error) => {
        // Handle any errors that occurred during the asynchronous operation
        console.error(error);
        searchBtn.disabled = false; // Enable the button even if an error occurs
      });
  }

  function showMoreImages() {
    showMoreBtn.disabled = true;
    searchImages()
      .then(() => {
        // Enable the button once the asynchronous operation is complete
        showMoreBtn.disabled = false;
      })
      .catch((error) => {
        // Handle any errors that occurred during the asynchronous operation
        console.error(error);
        showMoreBtn.disabled = false; // Enable the button even if an error occurs
      });
  }
});
