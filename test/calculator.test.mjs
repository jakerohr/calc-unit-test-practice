import assert from 'assert';
// import jsdom from ('jsdom');
import { JSDOM } from 'jsdom';
// import fs from ('fs');
import path from 'path';
import { initCalc } from '../public/javascripts/modules/calculator.mjs';
import {getHTMLElementInterface} from "jsdom/lib/jsdom/living/helpers/create-element.js";
let display;
let button = {};
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

  xit('should display a number if number key is pressed', function () {
    const displayNum = button.one;
    console.log(displayNum.dataset.id);
    assert.strictEqual(
      displayNum.textContent,
      '1',
      'output did not equal number 1'
    );
  });

  xit('should append a number if a second number key is pressed', function () {
    const buttonOne = button.one;
    const buttonTwo = button.two;
    const appendNum = '' + buttonOne.dataset.id + buttonTwo.dataset.id;
    console.log(appendNum);
    assert.strictEqual(
      appendNum.textContent,
      '12',
      'output did not equal number 12'
      );
    });

  xit('should reset to zero if clear key is pressed', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  });

  xit('should add a decimal to a number', function () {
    // write your own tests
    assert.strictEqual(true, false, "update this test");
  });

  xit('should show operator keys as depressed when clicked', function () {
    // write your own tests. You don't necessarily need to use the "strictEqual" for every test.
    assert.strictEqual(true, false, 'update this test');
  })

  xit('should only allow one operator key to be depressed at a time', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  })

  xit('should show new number if pressed after an operator key', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  });

  xit('should add two numbers together', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  })
  xit('should subtract two numbers', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  })
  xit('should multiply two numbers', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  })
  xit('should divide two numbers', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  })
  // write more tests below. Think about how to test for "unhappy paths".
  // Try to break it in as many ways as you can!

  xit('has a sample test', function() {
    assert.equal(true, true);
  });
});
