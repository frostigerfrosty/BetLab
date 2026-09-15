// Dashboard-Data
const dashboard = {
    bankroll: 420.50,
    totalProfit: 84.20,
    roi: 8.42,
    winRate: 61.2
};

// Bets
const bets = [
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


//writing the values into HTML
document.getElementById("bankroll").textContent =
    "CHF " + dashboard.bankroll.toFixed(2);

document.getElementById("total-profit").textContent =
    "+ CHF " + dashboard.totalProfit.toFixed(2);

document.getElementById("roi").textContent =
    dashboard.roi.toFixed(2) + "%";

document.getElementById("win-rate").textContent =
    dashboard.winRate.toFixed(1) + "%";

// Get the table body from HTML
const betsTable = document.getElementById("bets-table");

// Create a table row for every bet
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

        <strong>${bet.profit !== 0 ? "CHF " + bet.profit.toFixed(2) : "—"}</strong>
    `;

    betsTable.appendChild(row);
});