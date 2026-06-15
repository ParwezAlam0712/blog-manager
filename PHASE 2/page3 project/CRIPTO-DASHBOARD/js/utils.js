export function loadFavorites() {

    return JSON.parse(
        localStorage.getItem("favorites")
    ) || [];
}

export function saveFavorite(coin) {

    const favorites = loadFavorites();

    if (!favorites.includes(coin)) {

        favorites.push(coin);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    }
}