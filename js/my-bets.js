const savedBets = localStorage.getItem("betlab_bets");

const bets = savedBets
    ? JSON.parse(savedBets)
    : [];

const betsTable = document.getElementById("bets-table");
const betSort = document.getElementById("bet-sort");


// EDIT MODAL
const editBetModal = document.getElementById("edit-bet-modal");
const closeEditModal = document.getElementById("close-edit-modal");
const cancelEditModal = document.getElementById("cancel-edit-modal");
const editBetForm = document.getElementById("edit-bet-form");

let editingIndex = null;


// ADD BET MODAL
const addBetButton = document.getElementById("add-bet-button");
const addBetModal = document.getElementById("add-bet-modal");
const closeModalButton = document.getElementById("close-modal");
const cancelModalButton = document.getElementById("cancel-modal");
const addBetForm = document.getElementById("add-bet-form");


// RENDER BETS
function renderBets() {

    betsTable.innerHTML = "";

    const sortedBets = [...bets];


    if (betSort.value === "newest") {

        sortedBets.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });

    }


    if (betSort.value === "oldest") {

        sortedBets.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        });

    }


    if (betSort.value === "profit-high") {

        sortedBets.sort(function(a, b) {
            return b.profit - a.profit;
        });

    }


    if (betSort.value === "profit-low") {

        sortedBets.sort(function(a, b) {
            return a.profit - b.profit;
        });

    }

    if (sortedBets.length === 0) {

    betsTable.innerHTML = `
        <div class="empty-state">

            <strong>No bets found</strong>

            <p>You haven't recorded any bets yet.</p>

            <button
                class="add-button empty-add-button"
                id="empty-add-bet-button"
            >
                + Add Bet
            </button>

        </div>
    `;


    document
        .getElementById("empty-add-bet-button")
        .addEventListener("click", function() {

            openAddBetModal();

        });


    return;
}

    sortedBets.forEach(function(bet) {

        const row = document.createElement("div");

        row.classList.add("table-row");


        row.innerHTML = `
            <span>${bet.date}</span>

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
                    ? (bet.profit > 0 ? "+ " : "") +
                      "CHF " +
                      bet.profit.toFixed(2)
                    : "—"
                }
            </strong>

            <div class="bet-actions">

                <button
                    class="edit-button"
                    onclick="editBet(${bets.indexOf(bet)})"
                >
                    Edit
                </button>

                <button
                    class="delete-button"
                    onclick="deleteBet(${bets.indexOf(bet)})"
                >
                    Delete
                </button>

            </div>
        `;


        betsTable.appendChild(row);

    });

}


// SORTING
betSort.addEventListener("change", renderBets);


// ADD BET
function openAddBetModal() {

    addBetModal.classList.add("active");

}


addBetButton.addEventListener("click", function() {

    openAddBetModal();

});


// CLOSE ADD BET MODAL
closeModalButton.addEventListener("click", function() {

    addBetModal.classList.remove("active");

});


cancelModalButton.addEventListener("click", function() {

    addBetModal.classList.remove("active");

});


// SAVE NEW BET
addBetForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const team1 =
        document.getElementById("team1").value;

    const team2 =
        document.getElementById("team2").value;

    const type =
        document.getElementById("bet-type").value;

    const odds =
        Number(document.getElementById("odds").value);

    const stake =
        Number(document.getElementById("stake").value);

    const date =
        document.getElementById("bet-date").value;

    const result =
        document.getElementById("result").value;


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
        date: date,
        result: result,
        profit: profit

    };


    bets.push(newBet);


    localStorage.setItem(
        "betlab_bets",
        JSON.stringify(bets)
    );


    addBetForm.reset();

    addBetModal.classList.remove("active");


    renderBets();

});


// EDIT BET
function editBet(index) {

    editingIndex = index;

    const bet = bets[index];


    document.getElementById("edit-team1").value =
        bet.team1;

    document.getElementById("edit-team2").value =
        bet.team2;

    document.getElementById("edit-bet-type").value =
        bet.type;

    document.getElementById("edit-odds").value =
        bet.odds;

    document.getElementById("edit-stake").value =
        bet.stake;

    document.getElementById("edit-bet-date").value =
        bet.date;

    document.getElementById("edit-result").value =
        bet.result;


    editBetModal.classList.add("active");

}


// CLOSE EDIT MODAL
closeEditModal.addEventListener("click", function() {

    editBetModal.classList.remove("active");

});


cancelEditModal.addEventListener("click", function() {

    editBetModal.classList.remove("active");

});


// SAVE EDITED BET
editBetForm.addEventListener("submit", function(event) {

    event.preventDefault();


    if (editingIndex === null) {
        return;
    }


    const team1 =
        document.getElementById("edit-team1").value;

    const team2 =
        document.getElementById("edit-team2").value;

    const type =
        document.getElementById("edit-bet-type").value;

    const odds =
        Number(document.getElementById("edit-odds").value);

    const stake =
        Number(document.getElementById("edit-stake").value);

    const date =
        document.getElementById("edit-bet-date").value;

    const result =
        document.getElementById("edit-result").value;


    let profit = 0;


    if (result === "win") {

        profit = stake * (odds - 1);

    }


    if (result === "loss") {

        profit = -stake;

    }


    bets[editingIndex] = {

        team1: team1,
        team2: team2,
        type: type,
        odds: odds,
        stake: stake,
        date: date,
        result: result,
        profit: profit

    };


    localStorage.setItem(
        "betlab_bets",
        JSON.stringify(bets)
    );


    editBetModal.classList.remove("active");

    editingIndex = null;

    renderBets();

});


// DELETE BET
function deleteBet(index) {

    const confirmed = confirm(
        "Are you sure you want to delete this bet?"
    );


    if (!confirmed) {
        return;
    }


    bets.splice(index, 1);


    localStorage.setItem(
        "betlab_bets",
        JSON.stringify(bets)
    );


    renderBets();

}


// INITIAL RENDER
renderBets();