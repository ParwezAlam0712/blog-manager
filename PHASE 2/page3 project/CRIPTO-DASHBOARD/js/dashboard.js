import {
    fetchCoin,
    fetchHistory
} from "./api.js";
import { loadFavorites, saveFavorite }
    from "./utils.js";

const results = document.getElementById("results");
const search = document.getElementById("search");
const favList = document.getElementById("favList");
const loader = document.getElementById("loader");
/*
==================================
DARK MODE BUTTON
==================================

Theme toggle button ko
JavaScript access karegi.
*/

const themeToggle = document.getElementById("themeToggle");

let chart;
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

            <p>
    Market Cap:
    $${data.market_data.market_cap.usd.toLocaleString()}
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

    /*
    Spinner Show
    */

    loader.classList.remove("hidden");

    try {

        const data =
            await fetchCoin(coin);

        renderCoin(data);

        await renderChart(coin);

    } catch (error) {

        results.innerHTML =
            `<p class="error">Coin Not Found</p>`;

        console.error(error);

    } finally {

        /*
        Spinner Hide
        */

        loader.classList.add("hidden");
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

async function renderChart(coin) {

    const history =
        await fetchHistory(coin);

    const ctx =
        document
            .getElementById("priceChart")
            .getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "line",

        data: {

            labels:
                history.prices.map(
                    p =>
                        new Date(p[0])
                            .toLocaleDateString()
                ),

            datasets: [{

                label:
                    `${coin} Price`,

                data:
                    history.prices.map(
                        p => p[1]
                    )
            }]
        }
    });
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

/*
==================================
DARK MODE TOGGLE + SAVE
==================================

Theme change karne ke saath
LocalStorage me bhi save karega.
*/

themeToggle.addEventListener(
    "click",
    () => {

        document.body
            .classList
            .toggle("dark-mode");

        /*
        Check current theme
        */

        const isDarkMode =
            document.body
                .classList
                .contains("dark-mode");

        /*
        Save theme
        */

        localStorage.setItem(
            "darkMode",
            isDarkMode
        );
    }
);

/*
==================================
RESTORE SAVED THEME
==================================

Page load hote hi
saved theme apply hogi.
*/

const savedTheme =
    localStorage.getItem("darkMode");

if (savedTheme === "true") {

    document.body
        .classList
        .add("dark-mode");
}