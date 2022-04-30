const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

const updateDisplay = () => {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
};

const clearCalculator = () => {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
};

const inputDigit = (digit) => {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
};

const inverseNumber = () => {
  if (calculator.displayNumber === "0") {
    return;
  }
  let numberLength = calculator.displayNumber.length;
  calculator.displayNumber =
    calculator.displayNumber.slice(0, numberLength - 3) * -1;
};

const handleOperator = (operator) => {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    calculator.displayNumber = "0";
  } else {
    alert("operator sudah ditetapkan");
  }
};

const performCalculation = () => {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  calculator.displayNumber = result;
};

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", (event) => {
    const target = event.target;

    // update
    inputDigit(target.innerText);
    updateDisplay();

    // clears
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    // inverse
    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    // calculate
    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    // operator
    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
    }
  });
}
