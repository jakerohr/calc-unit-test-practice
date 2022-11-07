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
      // add calculator funcionality here!
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayedNum = display.textContent;
      const previousKeyType = calculator.dataset.previousKeyType;

      // If the calculator shows 0, we want to replace the calculator’s display with the textContent of the clicked key.
      //If the previousKeyType is an operator, we want to replace the displayed number with clicked number
      if (!action) {
        if (displayedNum === 0 || previousKeyType === 'operator') {
          display.textContent = keyContent
        } else {
          display.textContent = displayedNum + keyContent
        }
      }
      ;
      // If user hits any number after hitting a decimal key, the number should be appended on the display as well
      if (action === 'decimal') {
        display.textContent = displayedNum + '.'
      }
      ;

      if (!action) {
        console.log("You pressed a number key");
      }
      if (
          action === 'add' ||
          action === 'subtract' ||
          action === 'divide' ||
          action === 'multiply'
      ) {
        key.classList.add('is-depressed'); // Operator keys should be depressed when they're clicked on
        // update the display to the clicked key. Before we do this, we need a way to tell if the previous key is an operator key.
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.firstValue = displayedNum; // store the calculator’s displayed value before we erase it
        calculator.dataset.operator = action;
        //console.log("you pressed an operator key");
      }
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
      if (action == 'decimal'){
        console.log('You press the decimal key')
      }
      if (action == 'clear') {
        console.log("you pressed the clear key")
      }
      if (action == 'calculate') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
        //console.log("you pressed the equal key")

        display.textContent = calculate(firstValue, operator, secondValue)
      }
      updateDisplay(display.textContent)

      // remove .is-depressed class from all keys
      Array.from(key.parentNode.children)
          .forEach(k => k.classList.remove('is-depressed'))
    }
  });
};
export const initCalc = () => {
  getElements();
  addListeners();
}
