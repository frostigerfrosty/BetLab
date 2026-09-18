// Calculator

const calculatorForm =
    document.getElementById("calculator-form");

const stakeInput =
    document.getElementById("calculator-stake");

const oddsInput =
    document.getElementById("calculator-odds");

const returnOutput =
    document.getElementById("calculator-return");

const profitOutput =
    document.getElementById("calculator-profit");

const probabilityOutput =
    document.getElementById("calculator-probability");

const resetButton =
    document.getElementById("calculator-reset");


// CALCULATE

function calculateBet() {

    const stake = Number(stakeInput.value);
    const odds = Number(oddsInput.value);

    if (
        !Number.isFinite(stake) ||
        !Number.isFinite(odds) ||
        stake <= 0 ||
        odds < 1.01
    ) {
        return;
    }

    const potentialReturn =
        stake * odds;

    const potentialProfit =
        potentialReturn - stake;

    const impliedProbability =
        (1 / odds) * 100;

    returnOutput.textContent =
        `CHF ${potentialReturn.toFixed(2)}`;

    profitOutput.textContent =
        `+ CHF ${potentialProfit.toFixed(2)}`;

    probabilityOutput.textContent =
        `${impliedProbability.toFixed(2)}%`;

}


// RESET

function resetCalculator() {

    calculatorForm.reset();

    returnOutput.textContent =
        "CHF 0.00";

    profitOutput.textContent =
        "+ CHF 0.00";

    probabilityOutput.textContent =
        "0.00%";

    profitOutput.classList.remove("loss-text");
    profitOutput.classList.add("positive-text");

}


// EVENTS

calculatorForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        calculateBet();

    }
);

resetButton.addEventListener(
    "click",
    resetCalculator
);