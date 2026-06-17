
const coinName =
    document.getElementById("coinName");

const coinAmount =
    document.getElementById("coinAmount");

const addPortfolioBtn =
    document.getElementById("addPortfolioBtn");

const portfolioContainer =
    document.getElementById("portfolioContainer");

let portfolio =
    JSON.parse(
        localStorage.getItem("portfolio")
    ) || [];

console.log(portfolio);
console.log(typeof portfolio);

function savePortfolio() {

    localStorage.setItem(
        "portfolio",
        JSON.stringify(portfolio)
    );

}

function renderPortfolio() {


    let total = 0;

    portfolioContainer.innerHTML = "";

    portfolio.forEach((coin, index) => {

        total += Number(coin.amount);

        portfolioContainer.innerHTML += `
            <div class="card">

                <h3>${coin.name}</h3>

                <p>
                    Amount: ${coin.amount}
                </p>

                <button onclick="deleteCoin(${index})">
                    Delete
                </button>

            </div>
        `;

    });

    document.getElementById("totalHoldings")
    .textContent = total;

}

function deleteCoin(index) {

    portfolio.splice(index, 1);

    savePortfolio();

    renderPortfolio();

}

addPortfolioBtn.addEventListener("click", () => {

    let total = 0;

    console.log("Button Clicked");

    if (
        !coinName.value ||
        !coinAmount.value
    ) {
        alert("Input Empty");
        return;
    }

    portfolio.push({
        name: coinName.value,
        amount: coinAmount.value
    });

    console.log(portfolio);

    savePortfolio();
    renderPortfolio();

    coinName.value = "";
    coinAmount.value = "";

});
renderPortfolio();