"use strict";
const display = document.querySelector(".display");
const decimal = document.querySelector("#decimal");
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

function checkDivideZero() {
  if (operations[1] === "/" && operations[2] === "0") {
    console.log("in if");
    display.innerText = "cannot divide by zero";
    operations.pop();
    return true;
  }
  return false;
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
    if (checkDivideZero()) {
      return;
    }
    display.innerText = operate(operations[1], operations[0], operations[2]);
    operations = [];
    decimal.addEventListener("click", buttonHandler);
  }

  // Click was on operator(+,-,x,/) button
  if (operators.includes(e.target.innerText)) {
    operations.push(display.innerText);
    console.log(operations);
    if (operations.length === 3) {
      if (checkDivideZero()) {
        return;
      }
      display.innerText = operate(operations[1], operations[0], operations[2]);
      operations = [];
      operations.push(display.innerText);
    }
    operations.push(e.target.innerText);
    decimal.addEventListener("click", buttonHandler);
  }

  // Click was on clear button
  if (e.target.innerText === "Clear") {
    display.innerText = "0";
    operations = [];
    decimal.addEventListener("click", buttonHandler);
  }

  // Click was on decimal(.) button
  if (e.target.innerText === ".") {
    display.innerText += ".";
    decimal.removeEventListener("click", buttonHandler);
    console.log(e.target);
  }

  // Click was on backspace button
  if (e.target.innerText === "Backspace") {
    display.innerText = display.innerText.slice(0, -1);
  }

  lastButtonClicked = e.target.innerText;
}

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", buttonHandler);
});
