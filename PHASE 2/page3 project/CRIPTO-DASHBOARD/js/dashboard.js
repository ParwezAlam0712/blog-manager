import { fetchCoin } from "./api.js";
import { loadFavorites, saveFavorite }
    from "./utils.js";

const results = document.getElementById("results");
const search = document.getElementById("search");
const favList =
    document.getElementById("favList");
/*
  Coin Render Function
*/
function renderCoin(data) {

    results.innerHTML = `
        <div class="card">

            <h2>
                ${data.name}
                (${data.symbol.toUpperCase()})
            </h2>

            <p>
                Price:
                $${data.market_data.current_price.usd}
            </p>

            <p>
                24h Change:
                ${data.market_data.price_change_percentage_24h}%
            </p>

            <button id="favBtn">
             Add To Favorites
            </button>
        </div>
    `;
    document
        .getElementById("favBtn")
        .addEventListener("click", () => {

            saveFavorite(data.id);

            renderFavorites();
        });
}

/*
  Load Coin
*/
async function loadCoin(coin = "bitcoin") {

    try {

        const data = await fetchCoin(coin);

        renderCoin(data);

    } catch (error) {

        results.innerHTML =
            `<p class="error">Coin Not Found</p>`;

        console.error(error);
    }
}

function renderFavorites() {

    const favorites =
        loadFavorites();

    favList.innerHTML =
        favorites
            .map(
                coin =>
                    `<li>${coin}</li>`
            )
            .join("");
}
/*
  Search Event
*/
search.addEventListener("keypress", async (event) => {

    if (event.key === "Enter") {

        const coinName =
            search.value.trim().toLowerCase();

        if (!coinName) return;

        loadCoin(coinName);
    }
});

/*
  Initial Coin
*/
loadCoin();
renderFavorites();
   