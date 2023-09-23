var requestOptions = {
  method: "GET",
  redirect: "follow",
};

const artistName = document.querySelector(".artist-name");
const streams = document.querySelector(".streams");
const listeners = document.querySelector(".listeners");

let listCount = 50;
fetch(
  "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=ef2598c17941cd91d64a966c6013bd6a&format=json",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    const formattedResult = JSON.stringify(result, null, 2);
    // Display the artist name in the .artist-name element
    const cardContainer = document.querySelector(".card-container");

    for (let i = 0; i < listCount; ++i) {
      let artistNameVal = result.artists.artist[i].name;
      let streamsVal = result.artists.artist[i].playcount;
      let listenersVal = result.artists.artist[i].listeners;

      cardContainer.innerHTML += `
      <div class="card">
        <div class="artist-rank-container">
          <h3 class="artist-rank">${i + 1}</h3>
        </div>
        <div class="card-text">
          <h1 class="artist-name">${artistNameVal}</h1>
          <p class="streams">Streams: ${streamsVal}</p>
          <p class="listeners">Listeners: ${listenersVal}</p>
        </div>
      </div>`;
    }

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", function () {
        // Your event handling code here
        console.log("Div clicked!");
      });
    });

    // artistName.textContent = result.artists.artist[0].name;
    // streams.textContent = `Streams: ${result.artists.artist[0].playcount}`;
    // listeners.textContent = `Listeners: ${result.artists.artist[0].listeners}`;
  })
  .catch((error) => console.log("error", error));
console.log("pass");
