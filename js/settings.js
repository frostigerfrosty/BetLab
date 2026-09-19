// Settings

const settingsForm =
    document.getElementById("settings-form");

const startingBankrollInput =
    document.getElementById("starting-bankroll");

const successMessage =
    document.getElementById("settings-success");

const resetButton =
    document.getElementById("reset-data");

const resetModal =
    document.getElementById("reset-modal");

const closeResetModal =
    document.getElementById("close-reset-modal");

const cancelReset =
    document.getElementById("cancel-reset");

const confirmReset =
    document.getElementById("confirm-reset");


// LOAD SETTINGS

function loadSettings() {

    const savedBankroll =
        localStorage.getItem("betlab_starting_bankroll");

    if (savedBankroll !== null) {

        startingBankrollInput.value =
            savedBankroll;

    }

}


// SAVE SETTINGS

settingsForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const bankroll =
            Number(startingBankrollInput.value);

        if (
            !Number.isFinite(bankroll) ||
            bankroll < 0
        ) {
            return;
        }

        localStorage.setItem(
            "betlab_starting_bankroll",
            bankroll.toFixed(2)
        );

        successMessage.classList.add("visible");

        setTimeout(function() {

            successMessage.classList.remove("visible");

        }, 2500);

    }
);


// OPEN RESET MODAL

resetButton.addEventListener(
    "click",
    function() {

        resetModal.classList.add("active");

    }
);


// CLOSE RESET MODAL

function closeResetModalWindow() {

    resetModal.classList.remove("active");

}


closeResetModal.addEventListener(
    "click",
    closeResetModalWindow
);

cancelReset.addEventListener(
    "click",
    closeResetModalWindow
);


// RESET ALL DATA

confirmReset.addEventListener(
    "click",
    function() {

        localStorage.setItem(
            "betlab_bets",
            JSON.stringify([])
        );

        localStorage.setItem(
            "betlab_starting_bankroll",
            "0.00"
        );

        window.location.href = "index.html";

    }
);


// INITIAL LOAD

loadSettings();