// Dashboard-Data
const dashboard = {
    bankroll: 420.50,
    totalProfit: 84.20,
    roi: 8.42,
    winRate: 61.2
};


//writing the values into HTML
document.getElementById("bankroll").textContent =
    "CHF " + dashboard.bankroll.toFixed(2);

document.getElementById("total-profit").textContent =
    "+ CHF " + dashboard.totalProfit.toFixed(2);

document.getElementById("roi").textContent =
    dashboard.roi.toFixed(2) + "%";

document.getElementById("win-rate").textContent =
    dashboard.winRate.toFixed(1) + "%";