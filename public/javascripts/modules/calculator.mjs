let calculator;
let display;
let keys;

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
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayedNum = display.textContent;
      if (!action) {
        if (displayedNum === '0') {
          updateDisplay(keyContent);
        } else {
          const concatNum = displayedNum + keyContent;
          updateDisplay(concatNum);
        }
      }
      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        updateDisplay("it's an operator!");
      }
      if (action === 'decimal') {
        console.log('decimal key!');
      }

      if (action === 'clear') {
        updateDisplay('0');
      }

      if (action === 'calculate') {
        console.log('equal key!');
      }
    }
  });
};
export const initCalc = () => {
  getElements();
  addListeners();
}
