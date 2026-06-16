const API_URL ="https://api.coingecko.com/api/v3";
/*
  Bitcoin Data Fetch
*/
export async function fetchCoin(coin = "bitcoin") {

    const response = await fetch(
        `${API_URL}/coins/${coin}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch coin");
    }

    const data = await response.json();

    return data;
}

export async function fetchHistory(
    coin = "bitcoin"
) {

    const response = await fetch(
        `${API_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch history"
        );
    }

    return response.json();
}

/*
==================================
FETCH MARKET COINS
==================================

Top cryptocurrencies ka market data
CoinGecko se fetch karega.

Ye data baad me:

🔥 Top Gainers
📉 Top Losers

widget banane ke liye use hoga.
*/

export async function fetchMarketCoins() {

    const response = await fetch(

        `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1`

    );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch market coins"
        );
    }

    return response.json();
}

/*
==================================
ISSE KYA HOGA ?
==================================

Global crypto market data fetch karega.

Use:

Market Cap
Volume
BTC Dominance

cards fill karne ke liye.
*/

export async function fetchGlobalData() {

    const response = await fetch(
        "https://api.coingecko.com/api/v3/global"
    );

    if (!response.ok) {

        throw new Error(
            "Failed To Fetch Global Data"
        );
    }

    return response.json();
}

