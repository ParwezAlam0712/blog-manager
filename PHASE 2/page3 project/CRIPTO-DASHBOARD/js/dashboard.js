/*
==================================
ISSE KYA HOGA ?
==================================

Global market data bhi import hogi.
*/

import {
    fetchCoin,
    fetchHistory,
    fetchMarketCoins,
    fetchGlobalData
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
const searchResults = document.getElementById("searchResults");

let chart;

/*
==================================
MARKET WIDGET ELEMENTS
==================================

Top Gainers aur Top Losers
list ko control karne ke liye.
*/

const gainersList =
    document.getElementById("gainersList");

const losersList =
    document.getElementById("losersList");

/*
==================================
MARKET STATS ELEMENTS
==================================

Stats cards ko access karne ke liye.
*/

const marketCap =
    document.getElementById("marketCap");

const volume =
    document.getElementById("volume");

const btcDominance =
    document.getElementById("btcDominance");

const fearGreed =
    document.getElementById("fearGreed");


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

/*
==================================
LIVE MARKET STATS
==================================

Market overview cards fill karega.
*/

async function renderMarketStats() {

    try {

        const data =
            await fetchGlobalData();

        marketCap.textContent =
            "$" +
            Math.round(
                data.data.total_market_cap.usd /
                1000000000000
            ) +
            " Trillion";

        volume.textContent =
            "$" +
            Math.round(
                data.data.total_volume.usd /
                1000000000
            ) +
            " Billion";

        btcDominance.textContent =
            data.data.market_cap_percentage
                .btc
                .toFixed(2) + "%";

        /*
        Temporary value

        Later API se live
        Fear & Greed laayenge.
        */

        fearGreed.textContent =
            "72";

    } catch (error) {

        console.error(
            "Stats Error",
            error
        );
    }
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
==================================
RENDER MARKET WIDGETS
==================================

Market data fetch karke
Top Gainers aur Top Losers
screen par dikhayega.
*/

async function renderMarketWidgets() {

    try {

        const coins =
            await fetchMarketCoins();

        /*
        Top Gainers
        */

        const gainers =
            [...coins]
                .sort(
                    (a, b) =>
                        b.price_change_percentage_24h -
                        a.price_change_percentage_24h
                )
                .slice(0, 5);

        /*
        Top Losers
        */

        const losers =
            [...coins]
                .sort(
                    (a, b) =>
                        a.price_change_percentage_24h -
                        b.price_change_percentage_24h
                )
                .slice(0, 5);

        /*
        Render Gainers
        */

        gainersList.innerHTML =
            gainers
                .map(
                    coin =>

                        `<li>
                    ${coin.name}
                    (${coin.price_change_percentage_24h.toFixed(2)}%)
                </li>`
                )
                .join("");

        /*
        Render Losers
        */

        losersList.innerHTML =
            losers
                .map(
                    coin =>

                        `<li>
                    ${coin.name}
                    (${coin.price_change_percentage_24h.toFixed(2)}%)
                </li>`
                )
                .join("");

    } catch (error) {

        console.error(
            "Market Widget Error",
            error
        );
    }
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
LOAD DASHBOARD DATA
==================================
*/

renderMarketWidgets();

renderMarketStats();
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