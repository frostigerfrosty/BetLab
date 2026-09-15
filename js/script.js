// Dashboard-Data
const dashboard = {
    bankroll: 420.50,
    totalProfit: 84.20,
    roi: 8.42,
    winRate: 61.2
};

// Bets
const defaultBets = [
    {
        team1: "Arsenal",
        team2: "Chelsea",
        type: "Match Winner",
        odds: 1.72,
        stake: 20,
        result: "win",
        profit: 14.40
    },

    {
        team1: "Barcelona",
        team2: "Sevilla",
        type: "Over 2.5",
        odds: 1.84,
        stake: 15,
        result: "loss",
        profit: -15
    },

    {
        team1: "Liverpool",
        team2: "Brighton",
        type: "Match Winner",
        odds: 1.55,
        stake: 25,
        result: "win",
        profit: 13.75
    },

    {
        team1: "Real Madrid",
        team2: "Valencia",
        type: "BTTS",
        odds: 1.80,
        stake: 10,
        result: "pending",
        profit: 0
    }
];

const savedBets = localStorage.getItem("betlab_bets");

const bets = savedBets ? JSON.parse(savedBets) : defaultBets;


//writing the values into HTML
document.getElementById("bankroll").textContent =
    "CHF " + dashboard.bankroll.toFixed(2);

document.getElementById("total-profit").textContent =
    "+ CHF " + dashboard.totalProfit.toFixed(2);

document.getElementById("roi").textContent =
    dashboard.roi.toFixed(2) + "%";

document.getElementById("win-rate").textContent =
    dashboard.winRate.toFixed(1) + "%";

const betsTable = document.getElementById("bets-table");

function renderBets() {
    betsTable.innerHTML = "";

    bets.forEach(function(bet) {
        const row = document.createElement("div");
        row.classList.add("table-row");

        row.innerHTML = `
            <div class="event">
                <strong>${bet.team1}</strong>
                <small>vs ${bet.team2}</small>
            </div>

            <span>${bet.type}</span>
            <span>${bet.odds.toFixed(2)}</span>
            <span>CHF ${bet.stake.toFixed(2)}</span>

            <span class="badge ${bet.result}">
                ${bet.result.toUpperCase()}
            </span>

            <strong>
                ${bet.profit !== 0
                    ? (bet.profit > 0 ? "+ " : "") + "CHF " + bet.profit.toFixed(2)
                    : "—"
                }
            </strong>
        `;

        betsTable.appendChild(row);
    });
}

renderBets();

// Add Bet Modal
const addBetButton = document.getElementById("add-bet-button");
const addBetModal = document.getElementById("add-bet-modal");
const closeModalButton = document.getElementById("close-modal");
const cancelModalButton = document.getElementById("cancel-modal");
const addBetForm = document.getElementById("add-bet-form");


// Open modal
addBetButton.addEventListener("click", function() {
    addBetModal.classList.add("active");
});


// Close modal
closeModalButton.addEventListener("click", function() {
    addBetModal.classList.remove("active");
});


// Cancel button
cancelModalButton.addEventListener("click", function() {
    addBetModal.classList.remove("active");
});

// Save new bet
addBetForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const type = document.getElementById("bet-type").value;
    const odds = Number(document.getElementById("odds").value);
    const stake = Number(document.getElementById("stake").value);
    const result = document.getElementById("result").value;

    let profit = 0;

    if (result === "win") {
        profit = stake * (odds - 1);
    }

    if (result === "loss") {
        profit = -stake;
    }


    const newBet = {
        team1: team1,
        team2: team2,
        type: type,
        odds: odds,
        stake: stake,
        result: result,
        profit: profit
    };


    bets.push(newBet);

    localStorage.setItem("betlab_bets", JSON.stringify(bets));

    addBetForm.reset();

    addBetModal.classList.remove("active");

    renderBets();
});