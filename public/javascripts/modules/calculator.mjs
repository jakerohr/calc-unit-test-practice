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
      // add calculator funcionality here!
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayedNum = display.textContent;

      // If the calculator shows 0, we want to replace the calculator’s display with the textContent of the clicked key.
      if (!action) {
        if (displayedNum === 0) {
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
        calculator.dataset.previousKeyType = 'operator'
        //console.log("you pressed an operator key");
      }
      if (action == 'decimal'){
        console.log('You press the decimal key')
      }
      if (action == 'clear') {
        console.log("you pressed the clear key")
      }
      if (action == 'calculate') {
        console.log("you pressed the equal key")
      }
      updateDisplay('You pressed a button!')

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
