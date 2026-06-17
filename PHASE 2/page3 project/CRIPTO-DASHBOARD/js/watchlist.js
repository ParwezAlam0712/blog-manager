
const container =
    document.getElementById("watchlistContainer");

async function loadWatchlist() {

    const watchlist =
        JSON.parse(
            localStorage.getItem("watchlist")
        ) || [];

    container.innerHTML = "";

    for (const coinId of watchlist) {

        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coinId}`
        );

        const coin = await response.json();

        container.innerHTML += `
            <div class="card">
                <h3>${coin.name}</h3>
                <p>
                    $${coin.market_data.current_price.usd}
                </p>
            </div>
        `;
    }
}

loadWatchlist();