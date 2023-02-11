"use strict";
const display = document.querySelector(".display");
const operators = ["+", "-", "/", "x"];
let operations = [];
let lastButtonClicked = "";

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function buttonHandler(e) {
  // Click was on a number button
  if (Number(e.target.innerText) || e.target.innerText === "0") {
    if (operators.includes(lastButtonClicked) || display.innerText === "0") {
      display.innerText = "";
    }
    display.innerText += e.target.innerText;
    // return;
  }

  // Click was on equals(=) operator
  if (e.target.innerText === "=") {
    if (operations.length !== 2) return;
    operations.push(display.innerText);
    display.innerText = operate(operations[1], operations[0], operations[2]);
    operations = [];
    return;
  }

  // Click was on operator(+,-,x,/) button
  if (operators.includes(e.target.innerText)) {
    operations.push(display.innerText);
    console.log(operations);
    if (operations.length === 3) {
      display.innerText = operate(operations[1], operations[0], operations[2]);
      operations = [];
      operations.push(display.innerText);
    }
    operations.push(e.target.innerText);
  }

  if (e.target.innerText === "Clear") {
    display.innerText = "0";
    operations = [];
  }

  lastButtonClicked = e.target.innerText;
}

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", buttonHandler);
});
