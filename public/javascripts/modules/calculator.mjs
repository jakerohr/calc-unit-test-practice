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
      // Remove .is-depressed class from all keys
      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove('is-depressed')
      );
      const previousKeyType = calculator.dataset.previousKeyType;
      if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator') {
          updateDisplay(keyContent);
        } else {
          updateDisplay(displayedNum + keyContent);
        }
      }
      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        key.classList.add('is-depressed');
        calculator.dataset.previousKeyType = 'operator';
      }
      if (action === 'decimal') {
        updateDisplay(displayedNum + '.');
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
