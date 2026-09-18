
// Analytics Data

const savedBets = localStorage.getItem("betlab_bets");

const bets = savedBets
    ? JSON.parse(savedBets)
    : [];


// FILTER BETS

function getFilteredBets() {

    const dateFilter =
        document.getElementById("analytics-date-filter").value;

    const typeFilter =
        document.getElementById("analytics-type-filter").value;

    const resultFilter =
        document.getElementById("analytics-result-filter").value;


    let filteredBets = [...bets];


    // DATE FILTER

    if (dateFilter !== "all") {

        const days = Number(dateFilter);

        const today = new Date();

        const startDate = new Date();

        startDate.setDate(
            today.getDate() - days
        );


        filteredBets = filteredBets.filter(function(bet) {

            const betDate = new Date(bet.date);

            return betDate >= startDate;

        });

    }


    // TYPE FILTER

    if (typeFilter !== "all") {

        filteredBets = filteredBets.filter(function(bet) {

            return bet.type === typeFilter;

        });

    }


    // RESULT FILTER

    if (resultFilter !== "all") {

        filteredBets = filteredBets.filter(function(bet) {

            return bet.result === resultFilter;

        });

    }


    return filteredBets;

}


// ANALYTICS CALCULATIONS

function calculateAnalytics() {

    const filteredBets =
        getFilteredBets();


    let wins = 0;
    let losses = 0;
    let pending = 0;

    let totalOdds = 0;
    let oddsCount = 0;


    filteredBets.forEach(function(bet) {

        if (bet.result === "win") {
            wins++;
        }

        if (bet.result === "loss") {
            losses++;
        }

        if (bet.result === "pending") {
            pending++;
        }


        if (bet.result !== "pending") {

            totalOdds += bet.odds;

            oddsCount++;

        }

    });


    const averageOdds = oddsCount > 0
        ? totalOdds / oddsCount
        : 0;


    return {

        totalBets: filteredBets.length,

        wins: wins,

        losses: losses,

        pending: pending,

        averageOdds: averageOdds

    };

}


// UPDATE ANALYTICS

function updateAnalytics() {

    const analytics =
        calculateAnalytics();


    document.getElementById(
        "analytics-total-bets"
    ).textContent =
        analytics.totalBets;


    document.getElementById(
        "analytics-wins"
    ).textContent =
        analytics.wins;


    document.getElementById(
        "analytics-losses"
    ).textContent =
        analytics.losses;


    document.getElementById(
        "analytics-average-odds"
    ).textContent =
        analytics.averageOdds.toFixed(2);

}


// BET TYPE ANALYSIS

function renderBetTypeAnalytics() {

    const container =
        document.getElementById("bet-type-analytics");

    container.innerHTML = "";


    const filteredBets =
        getFilteredBets();


    if (filteredBets.length === 0) {

        container.innerHTML = `
            <p>No bets available.</p>
        `;

        return;
    }


    const betTypes = {};


    filteredBets.forEach(function(bet) {

        if (!betTypes[bet.type]) {

            betTypes[bet.type] = 0;

        }

        betTypes[bet.type]++;

    });


    const totalBets =
        filteredBets.length;


    Object.keys(betTypes).forEach(function(type) {

        const count =
            betTypes[type];


        const percentage =
            (count / totalBets) * 100;


        const item =
            document.createElement("div");

        item.classList.add(
            "distribution-item"
        );


        item.innerHTML = `
            <div class="distribution-top">

                <span>${type}</span>

                <strong>
                    ${percentage.toFixed(0)}%
                </strong>

            </div>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="width: ${percentage}%;">
                </div>

            </div>

            <small>
                ${count}
                ${count === 1 ? "bet" : "bets"}
            </small>
        `;


        container.appendChild(item);

    });

}


// PROFIT CHART

function renderProfitChart() {

    const container =
        document.getElementById("profit-chart");

    container.innerHTML = "";


    const filteredBets =
        getFilteredBets();


    const completedBets = [...filteredBets]
        .filter(function(bet) {

            return bet.result !== "pending";

        })
        .sort(function(a, b) {

            return new Date(a.date) -
                   new Date(b.date);

        });


    if (completedBets.length === 0) {

        container.innerHTML = `
            <p>No completed bets available.</p>
        `;

        return;
    }


    const values = [0];

    let cumulativeProfit = 0;


    completedBets.forEach(function(bet) {

        cumulativeProfit += bet.profit;

        values.push(cumulativeProfit);

    });


    const width = 100;
    const height = 100;


    const minValue =
        Math.min(...values);

    const maxValue =
        Math.max(...values);


    const range =
        maxValue - minValue || 1;


    const points =
        values.map(function(value, index) {

            const x =
                (index / (values.length - 1)) *
                width;


            const y =
                height -
                ((value - minValue) / range) *
                height;


            return `${x},${y}`;

        });


    const svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );


    svg.setAttribute(
        "viewBox",
        "0 0 100 100"
    );

    svg.setAttribute(
        "preserveAspectRatio",
        "none"
    );

    svg.classList.add(
        "analytics-chart"
    );


    const line =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline"
        );


    line.setAttribute(
        "points",
        points.join(" ")
    );


    line.setAttribute(
        "fill",
        "none"
    );


    line.classList.add(
        "analytics-chart-line"
    );


    svg.appendChild(line);

    container.appendChild(svg);

}


// RESULT DISTRIBUTION

function renderResultDistribution() {

    const container =
        document.getElementById(
            "performance-analysis"
        );

    container.innerHTML = "";


    const filteredBets =
        getFilteredBets();


    if (filteredBets.length === 0) {

        container.innerHTML = `
            <p>No bets available.</p>
        `;

        return;
    }


    let wins = 0;
    let losses = 0;
    let pending = 0;


    filteredBets.forEach(function(bet) {

        if (bet.result === "win") {
            wins++;
        }

        if (bet.result === "loss") {
            losses++;
        }

        if (bet.result === "pending") {
            pending++;
        }

    });


    const totalBets =
        filteredBets.length;


    const results = [

        {
            name: "Wins",
            count: wins
        },

        {
            name: "Losses",
            count: losses
        },

        {
            name: "Pending",
            count: pending
        }

    ];


    results.forEach(function(result) {

        const percentage =
            (result.count / totalBets) * 100;


        const item =
            document.createElement("div");


        item.classList.add(
            "distribution-item"
        );


        item.innerHTML = `
            <div class="distribution-top">

                <span>${result.name}</span>

                <strong>
                    ${percentage.toFixed(0)}%
                </strong>

            </div>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="width: ${percentage}%;">
                </div>

            </div>

            <small>
                ${result.count}
                ${result.count === 1 ? "bet" : "bets"}
            </small>
        `;


        container.appendChild(item);

    });

}


// PROFIT BY BET TYPE

function renderProfitByType() {

    const container =
        document.getElementById(
            "profit-by-type"
        );

    container.innerHTML = "";


    const filteredBets =
        getFilteredBets();


    if (filteredBets.length === 0) {

        container.innerHTML = `
            <p>No bets available.</p>
        `;

        return;
    }


    const profitByType = {};


    filteredBets.forEach(function(bet) {

        if (bet.result === "pending") {
            return;
        }


        if (!profitByType[bet.type]) {

            profitByType[bet.type] = 0;

        }


        profitByType[bet.type] +=
            bet.profit;

    });


    const types =
        Object.keys(profitByType);


    if (types.length === 0) {

        container.innerHTML = `
            <p>No completed bets available.</p>
        `;

        return;
    }


    types.forEach(function(type) {

        const profit =
            profitByType[type];


        const item =
            document.createElement("div");


        item.classList.add(
            "distribution-item"
        );


        const formattedProfit =
            (profit >= 0 ? "+ " : "- ") +
            "CHF " +
            Math.abs(profit).toFixed(2);


        item.innerHTML = `
            <div class="distribution-top">

                <span>${type}</span>

                <strong>
                    ${formattedProfit}
                </strong>

            </div>
        `;


        container.appendChild(item);

    });

}


// POPULATE BET TYPE FILTER

function populateBetTypeFilter() {

    const select =
        document.getElementById(
            "analytics-type-filter"
        );


    const types = [];


    bets.forEach(function(bet) {

        if (!types.includes(bet.type)) {

            types.push(bet.type);

        }

    });


    types.sort();


    types.forEach(function(type) {

        const option =
            document.createElement("option");


        option.value = type;

        option.textContent = type;


        select.appendChild(option);

    });

}


// UPDATE ALL ANALYTICS

function updateAllAnalytics() {

    updateAnalytics();

    renderBetTypeAnalytics();

    renderProfitChart();

    renderResultDistribution();

    renderProfitByType();

}


// FILTER EVENTS

document
    .getElementById("analytics-date-filter")
    .addEventListener(
        "change",
        updateAllAnalytics
    );


document
    .getElementById("analytics-type-filter")
    .addEventListener(
        "change",
        updateAllAnalytics
    );


document
    .getElementById("analytics-result-filter")
    .addEventListener(
        "change",
        updateAllAnalytics
    );


// INITIAL LOAD

populateBetTypeFilter();

updateAllAnalytics();

// SYNCHRONIZE WITH LOCALSTORAGE

window.addEventListener("storage", function(event) {

    if (event.key !== "betlab_bets") {
        return;
    }


    const updatedBets = event.newValue
        ? JSON.parse(event.newValue)
        : [];


    bets.length = 0;


    updatedBets.forEach(function(bet) {

        bets.push(bet);

    });


    const typeFilter =
        document.getElementById(
            "analytics-type-filter"
        );


    const currentType =
        typeFilter.value;


    typeFilter.innerHTML = `
        <option value="all">
            All Types
        </option>
    `;


    populateBetTypeFilter();


    if (
        [...typeFilter.options].some(
            function(option) {
                return option.value === currentType;
            }
        )
    ) {

        typeFilter.value = currentType;

    }


    updateAllAnalytics();

});

// EMPTY STATE

function updateAnalyticsEmptyState() {

    const emptyState =
        document.getElementById(
            "analytics-empty-state"
        );

    const filteredBets =
        getFilteredBets();


    if (filteredBets.length === 0) {

        emptyState.style.display = "flex";

    } else {

        emptyState.style.display = "none";

    }

}

function updateAllAnalytics() {

    updateAnalytics();

    renderBetTypeAnalytics();

    renderProfitChart();

    renderResultDistribution();

    renderProfitByType();

    updateAnalyticsEmptyState();

}