// Create a common fetch options object
const requestOptions = {
  method: "GET",
  redirect: "follow",
};

// Function to display artist bio
function displayArtistBio(artistName) {
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=ef2598c17941cd91d64a966c6013bd6a&format=json`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const { bio, name } = result.artist;
      const sidebarHero = document.querySelector(".sidebar-hero");
      const bioSummary = bio.summary;

      sidebarHero.innerHTML = `
        <div class="sidebar-hero">
          <h1>SOUND UP↑</h1>
          <h5>GLOBAL ARTISTS CHART POWERED BY LAST.FM API</h5>
          <div class="bio">
            <div class="bio-artist-name">
              <h2>${name}</h2>
            </div>
            <div class="bio-summary">
              <p>${bioSummary}</p>
            </div>
          </div>
        </div>
      `;
    })
    .catch((error) => console.log("error", error));
}

// Function to render artist cards
function renderArtistCards(artists) {
  const cardContainerOverflow = document.querySelector(
    ".card-container-overflow"
  );

  artists.forEach((artist, index) => {
    const { name, playcount, listeners } = artist;

    cardContainerOverflow.innerHTML += `
      <div class="card">
        <div class="artist-rank-container">
          <h3 class="artist-rank">${index + 1}</h3>
        </div>
        <div class="card-text">
          <h1 class="artist-name">${name}</h1>
          <p class="streams">Streams: ${playcount}</p>
          <p class="listeners">Listeners: ${listeners}</p>
        </div>
      </div>`;
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const cardArtistName = card.querySelector(".artist-name").textContent;
      displayArtistBio(cardArtistName);
    });
  });
}

// Fetch top artists
const listCount = 50;
fetch(
  "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=ef2598c17941cd91d64a966c6013bd6a&format=json",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    const artists = result.artists.artist.slice(0, listCount);
    renderArtistCards(artists);
  })
  .catch((error) => console.log("error", error));
console.log("pass");
