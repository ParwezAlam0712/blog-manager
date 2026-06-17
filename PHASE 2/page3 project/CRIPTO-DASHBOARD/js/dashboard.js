console.log("dashboard.js loaded");
console.log(document.getElementById("marketCap"));
console.log(document.getElementById("volume"));
console.log(document.getElementById("btcDominance"));
console.log(document.getElementById("fearGreed"));

async function loadGlobalData() {

    try {

        const response = await fetch(
            "https://api.coingecko.com/api/v3/global"
        );

        const data = await response.json();

        document.getElementById("marketCap").textContent =
            "$" +
            Math.round(
                data.data.total_market_cap.usd / 1000000000
            ) +
            "B";

        document.getElementById("volume").textContent =
            "$" +
            Math.round(
                data.data.total_volume.usd / 1000000000
            ) +
            "B";

        document.getElementById("btcDominance").textContent =
            data.data.market_cap_percentage.btc.toFixed(2) + "%";

    } catch (error) {

        console.log(error);

    }

}

async function loadFearGreed() {

    try {

        const response = await fetch(
            "https://api.alternative.me/fng/"
        );

        const data = await response.json();

        document.getElementById("fearGreed").textContent =
            data.data[0].value;

    } catch (error) {

        console.log(error);

    }

}

loadFearGreed();
loadGlobalData();

const searchInput =
    document.getElementById("search");

const searchResults =
    document.getElementById("searchResults");

searchInput?.addEventListener("input", async () => {

    const query = searchInput.value.trim();

    if (query.length < 2) {

        searchResults.innerHTML = "";

        return;
    }

    const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
    );

    const data = await response.json();

    searchResults.innerHTML = data.coins
        .slice(0, 5)
        .map(
            coin => `
    <div
        class="search-item"
        onclick="addToWatchlist('${coin.id}')"
    >
        ${coin.name} (${coin.symbol})
    </div>
`
        )
        .join("");

});

function addToWatchlist(coinId) {

    let watchlist =
        JSON.parse(
            localStorage.getItem("watchlist")
        ) || [];

    if (!watchlist.includes(coinId)) {

        watchlist.push(coinId);

        localStorage.setItem(
            "watchlist",
            JSON.stringify(watchlist)
        );

        alert("Added to Watchlist");
    }
}

function addToWatchlist(coinId) {

    let watchlist =
        JSON.parse(
            localStorage.getItem("watchlist")
        ) || [];

    if (!watchlist.includes(coinId)) {

        watchlist.push(coinId);

        localStorage.setItem(
            "watchlist",
            JSON.stringify(watchlist)
        );

        alert("Added to Watchlist");
    }
}

async function loadGlobalData() {

    try {

        const response = await fetch(
            "https://api.coingecko.com/api/v3/global"
        );

        const data = await response.json();

        // tumhara existing code

    } catch (error) {

        console.log("API Limit Reached");

    }
}