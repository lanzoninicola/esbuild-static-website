import { sum, SessionManager } from "../../dist/index.js";

const sessionManager = new SessionManager();
const firstNumber = document.getElementById("firstNumber");
const secondNumber = document.getElementById("secondNumber");
const resultCell = document.getElementById("result");
const btnResult = document.getElementById("makeSum");

let sumResult = 0;

btnResult.addEventListener("click", makeSum);

function makeSum() {
  sumResult = sum(
    parseInt(firstNumber.value, 10),
    parseInt(secondNumber.value, 10)
  );

  resultCell.textContent = sumResult;

  sessionManager.set("sumResult", sumResult);
}
