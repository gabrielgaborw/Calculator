import Calculator from "./components/Calculator/Calculator";
import Board from "./components/Board/Board";
import Screen from "./components/Screen/Screen";
import Key from "./components/Board/Key/Key";

import React, { useState } from "react";

// Numbers and calculator functions
const keys = [
  ["C", "+/-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
]

// Functions for formatting
const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  })

  // Clicking a number validation
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if(removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
        calc.num === 0 && value === "0"
          ? "0"
          : removeSpaces(calc.num) % 1 === 0
          ? toLocaleString(Number(removeSpaces(calc.num) + value))
          : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      })
    }
  }

  // Comma function
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    })
  }

  // Operand function
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    })
  }

  // Shows the operation result
  const equalsClickHandler = (e) => {
    if(calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "X"
        ? a * b
        : a / b

      setCalc({
        ...calc,
        res:
        calc.num === "0" && calc.sign === "/"
          ? "Can't divide with 0"
          : toLocaleString(
              math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
            ),
          sign: "",
          num: 0,
      })
    }
  }

  // Invert function
  const invertClickHandler = (e) => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    })
  }

  // Percentage function
  const percentClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    })
  }

  // Reset button
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    })
  }


  return (
    <Calculator>
      <Screen value={calc.num ? calc.num : calc.res} />
      <Board>
        {keys.flat().map((key, i) => {
          return (
            <Key className={key === "=" ? "equals" : ""} key={i} value={key} 
            onClick={key === "C"
              ? resetClickHandler
              : key === "+/-"
              ? invertClickHandler
              : key === "%"
              ? percentClickHandler
              : key === "="
              ? equalsClickHandler
              : key === "/" || key === "X" || key === "+" || key === "-"
              ? signClickHandler
              : key === "."
              ? commaClickHandler
              : numClickHandler} />
          )
        })}
      </Board>
    </Calculator>
  );
}

export default App;
