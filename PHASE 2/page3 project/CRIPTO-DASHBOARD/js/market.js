const marketContainer =
    document.getElementById("marketContainer");

async function loadMarkets() {

    try {

        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );

        const data = await response.json();

        marketContainer.innerHTML = "";

        data.slice(0, 10).forEach(coin => {

            marketContainer.innerHTML += `
                <div class="card">
                    <h3>${coin.name}</h3>

                    <p>
                        Symbol:
                        ${coin.symbol.toUpperCase()}
                    </p>

                   <p>
    Price:
    $${coin.current_price}
</p>

<p class="${coin.price_change_percentage_24h >= 0
                    ? "green"
                    : "red"
                }">
    24h:
    ${coin.price_change_percentage_24h.toFixed(2)}%
</p>
   <p>
    Market Cap:
    $${coin.market_cap.toLocaleString()}
</p>
                </div>
            `;
        });

    } catch (error) {

        console.log(error);

        marketContainer.innerHTML =
            "<p>Unable to load market data</p>";
    }
}

loadMarkets();