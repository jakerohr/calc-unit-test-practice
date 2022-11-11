let calculator;
let display;
let keys;
// let previousKeyType;

const getElements = () => {
  calculator = document.querySelector('.calculator');
  display = calculator.querySelector('.calculator__display');
  keys = calculator.querySelector('.calculator__keys');
};

const updateDisplay = (num, displayArg) => {
  const displayElm = displayArg || display;
  displayElm.textContent = num;
};

const addListeners = () => {
  keys.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
      // add calculator functionality here!
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayedNum = display.textContent;
      const previousKeyType = calculator.dataset.previousKeyType;

      // remove .is-depressed class from all keys
      Array.from(key.parentNode.children)
          .forEach(k => k.classList.remove('is-depressed'))

      const calculate = (n1, operator, n2) => {
        let result = '';

        if (operator === 'add') {
          result = parseInt(n1) + parseFloat(n2);
        } else if (operator === 'subtract') {
          result = parseInt(n1) + parseFloat(n2);
        } else if (operator === 'multiply') {
          result = parseInt(n1) + parseFloat(n2);
        } else if (operator === 'divide') {
          result = parseInt(n1) + parseFloat(n2);
        }
        return result
      };
      // switch vs else if
      // switch (operator) {
      //   case "add":
      //     return +n1 + +n2;
      //   case "subtract":
      //     return +n1 - +n2;
      //   case "multiply":
      //     return +n1 * +n2;
      //   case "divide":
      //     return +n1 / +n2;
      //   // case "modulo": //use later
      //   //   return +n1 % +n2;
      //   default:
      //     return result;
      //
      // }

      // If the calculator shows 0, we want to replace the calculator’s display with the textContent of the clicked key.
      //If the previousKeyType is an operator, we want to replace the displayed number with clicked number
      if (!action) {
        if (
            displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) {
          display.textContent = keyContent
        } else {
          display.textContent = displayedNum + keyContent
        }
        calculator.dataset.previousKeyType = 'number'
      }
      // If user hits any number after hitting a decimal key, the number should be appended on the display as well
      if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
          display.textContent = displayedNum + '.'
        } else if (
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) {
          display.textContent = '0.'
        }
        calculator.dataset.previousKeyType = 'decimal'
      }
      if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
      }
      if (action === 'clear') {
        if (key.textContent === 'AC') {
          calculator.dataset.firstValue = ''
          calculator.dataset.modValue = ''
          calculator.dataset.previousKeyType = ''
          calculator.dataset.operator = ''
        } else {
          key.textContent = 'AC'
        }
        display.textConent = 0
        calculator.dataset.previousKeyType = 'clear'
      }
      if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        let secondValue = displayedNum;
        //console.log("you pressed the equal key")
        if (firstValue) {
          if (previousKeyType === 'calculate') {
            firstValue = displayedNum
            secondValue = calculator.dataset.modValue
          }
          display.textContent = calculate(firstValue, operator, secondValue)
        }
        // Set modValue attribute
        calculator.dataset.modValue = secondValue
        calculator.dataset.previousKeyType = 'calculate'
      }
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      }
      if (
          action === 'add' ||
          action === 'subtract' ||
          action === 'divide' ||
          action === 'multiply'
          //action === 'modulo' //use later
      ) {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        // Note: It's sufficient to check for firstValue and operator because secondValue always exists
        if (firstValue &&
            operator &&
        previousKeyType !== 'operator'
        ) {
          const calcValue = calculate(firstValue, operator, secondValue)
          display.textContent = calcValue

          // Update calculated value as firstValue
          calculator.dataset.firstValue = calcValue
        } else {
          // If there are no calculations, set displayedNum as the firstValue
          calculator.dataset.firstValue = displayedNum
        }

        key.classList.add('is-depressed'); // Operator keys should be depressed when they're clicked on
        // update the display to the clicked key. Before we do this, we need a way to tell if the previous key is an operator key.
        calculator.dataset.previousKeyType = 'operator';
        //calculator.dataset.firstValue = displayedNum; // store the calculator’s displayed value before we erase it
        calculator.dataset.operator = action;
        //console.log("you pressed an operator key");
        if (
            firstValue &&
            operator &&
            previousKeyType !== 'operator'
        ) {
          display.textContent = calculate(firstValue, operator, secondValue)
        }
      }

      updateDisplay(display.textContent)
    }
  });
};
export const initCalc = () => {
  getElements();
  addListeners();
}
