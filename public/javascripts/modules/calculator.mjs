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

const calculate = (firstValue, operator, secondValue) => {
  const n1 = parseFloat(firstValue);
  const n2 = parseFloat(secondValue);
  let result;
  if (operator === 'add') {
    result = n1 + n2;
  } else if (operator === 'subtract') {
    result = n1 - n2;
  } else if (operator === 'multiply') {
    result = n1 * n2;
  } else if (operator === 'divide') {
    result = n1 / n2;
  }
  return result
}

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
        calculator.dataset.firstValue = displayedNum;
        calculator.dataset.operator = action;
      }
      if (action === 'decimal') {
        updateDisplay(displayedNum + '.');
      }

      if (action === 'clear') {
        updateDisplay('0');
      }

      if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
        display.textContent = calculate(firstValue, operator, secondValue);
      }
    }
  });
};
export const initCalc = () => {
  getElements();
  addListeners();
}
