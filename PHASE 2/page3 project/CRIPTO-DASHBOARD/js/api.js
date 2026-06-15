const API_URL = "https://api.coingecko.com/api/v3";

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