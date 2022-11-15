import assert from 'assert';
// import jsdom from ('jsdom');
import { JSDOM } from 'jsdom';
// import fs from ('fs');
import path from 'path';
import { initCalc } from '../public/javascripts/modules/calculator.mjs';
import {getHTMLElementInterface} from "jsdom/lib/jsdom/living/helpers/create-element.js";
let display;
let button = {};
// const getRandomButton = button[Math.floor(Math.random() * button.length)];
// document.getElementById("data-id").innerHTML=getRandomButton

describe('calculator', function () {
    let dom;

    beforeEach(async function () {
      dom = await JSDOM.fromFile(
        // loads the html for use in the tests
        path.resolve('public/index.html'),

      );
      await new Promise((resolve) =>
        dom.window.addEventListener('load', resolve)
      );

      global.document = dom.window.document;
      display = document.querySelector('.calculator__display');
      // Add more buttons as needed below
      button = {
        zero: document.querySelector('[data-id="0"]'),
        one: document.querySelector('[data-id="1"]'),
        two: document.querySelector('[data-id="2"]'),
        three: document.querySelector('[data-id="3"]'),
        four: document.querySelector('[data-id="4"]'),
        five: document.querySelector('[data-id="5"]'),
        six: document.querySelector('[data-id="6"]'),
        seven: document.querySelector('[data-id="7"]'),
        eight: document.querySelector('[data-id="8"]'),
        nine: document.querySelector('[data-id="9"]'),
        clear: document.querySelector('[data-action="clear"]'),
        decimal: document.querySelector('[data-action="decimal"]'),
        add: document.querySelector('[data-action="add"]'),
        subtract: document.querySelector('[data-action="subtract"]'),
        multiply: document.querySelector('[data-action="multiply"]'),
        divide: document.querySelector('[data-action="divide"]'),
        calculate: document.querySelector('[data-action="calculate"]'),


      }
      // initializes the calculator scripts
      initCalc();
    });

  it('should display a number if number key is pressed', function () {
    button.one.click();
    console.log(display.textContent)
    assert.strictEqual(
      display.textContent,
      '1',
      'output did not equal number 1'
    );
  });

  it('should append a number if a second number key is pressed', function () {
    button.five.click();
    button.zero.click();
    console.log(display.textContent)
    assert.strictEqual(
      display.textContent,
      '50',
      'output did not equal number 50'
      );
    });

  it('should reset to zero if clear key is pressed', function () {
    // write your own tests
    button.clear.click()
    console.log(display.textContent)
    assert.equal(display.textContent, 0);
  });

  it('should add a decimal to a number', function () {
    // write your own tests
    button.four.click();
    button.decimal.click();
    button.calculate.click();
    console.log(display.textContent)
    assert.equal(display.textContent, 4., "Output does not equal 4.");

  });

  it('should show operator keys as depressed when clicked', function () {
    // write your own tests. You don't necessarily need to use the "strictEqual" for every test.
    //https://nodejs.org/api/assert.html#assertokvalue-message
    button.multiply.click();
    const depressedOperatorKey = document.querySelectorAll('.is-depressed')
    //assert.match(depressedOperatorKey false, 'operator key is depressed');
    assert.ok(depressedOperatorKey, 'operator key is depressed');
  })
  it('should only allow one operator key to be depressed at a time', function () {
    // write your own tests
    button.multiply.click();
    button.add.click();
    button.divide.click();
    button.multiply.click();
    const depressedOperatorKey = document.querySelectorAll('.is-depressed')
    //key.classList.add('is-depressed'); // Operator keys should be depressed when they're clicked on
    assert.strictEqual(depressedOperatorKey.length, 1, 'Only one operator key can be pressed consecutively');
  })

  it('should show new number if pressed after an operator key', function () {
    // write your own tests
    button.one.click()
    button.add.click()
    button.four.click()
    console.log(display.textContent)
    assert.strict(display.textContent, 4, 'expected number should equal 4');
  });

  it('should add two numbers together', function () {
    // write your own tests
    button.nine.click();
    button.add.click();
    button.eight.click();
    button.calculate.click();
    console.log(display.textContent)
    assert.equal(display.textContent,  17)
  })
  it('should subtract two numbers', function () {
    // write your own tests
    button.nine.click();
    button.subtract.click();
    button.eight.click();
    button.calculate.click();
    console.log(display.textContent)
    assert.equal(display.textContent,  1)
  })
  it('should multiply two numbers', function () {
    // write your own tests
    button.four.click();
    button.multiply.click();
    button.seven.click();
    button.calculate.click();
    console.log(display.textContent)
    assert.equal(display.textContent, 28)
  })
  it('should divide two numbers', function () {
    // write your own tests
    button.four.click();
    button.four.click();
    button.divide.click();
    button.one.click();
    button.one.click();
    button.calculate.click();
    console.log(display.textContent)
    assert.equal(display.textContent, 4)
  })
  // write more tests below. Think about how to test for "unhappy paths".
  // Try to break it in as many ways as you can!
  it('can only add one decimal at a time', function () {
    button.four.click();
    button.decimal.click();
    button.decimal.click();
    const depressedDecimal = document.querySelector('.is-depressed');
    assert.strictEqual(display.textContent.split('.').length - 1, 1, 'only 1 decimal can be clicked')
  });
  it('can not divide number by zero', function () {
    button.one.click();
    button.divide.click();
    button.zero.click();
    button.calculate.click();
    console.log(display.textContent)
    assert.equal(display.textContent, Infinity, 'Cannot divide by zero')
  })
});
