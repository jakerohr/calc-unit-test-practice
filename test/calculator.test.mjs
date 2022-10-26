import assert from 'assert';
// import jsdom from ('jsdom');
import { JSDOM } from 'jsdom';
// import fs from ('fs');
import path from 'path';
import { initCalc } from '../public/javascripts/modules/calculator.mjs';
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
        one: document.querySelector('[data-id="1"]'),
        two: document.querySelector('[data-id="2"]'),
        clear: document.querySelector('[data-action="clear"]'),

      }
      // initializes the calculator scripts
      initCalc();
    });
  it('should display a number if number key is pressed', function () {
    button.one.click();
    assert.strictEqual(
      display.textContent,
      '1',
      'output did not equal number 1'
    );
  });
  it('should append a number if a second number key is pressed', function () {
    button.one.click();
    button.two.click();
    assert.strictEqual(
      display.textContent,
      '12',
      'output did not equal number 12'
      );
    });
  it('should reset to zero if clear key is pressed', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  });
  it('should add a decimal to a number', function () {
    // write your own tests
    assert.strictEqual(true, false, "update this test");
  });
  it('should show operator keys as depressed when clicked', function () {
    // write your own tests. You don't necessarily need to use the "strictEqual" for every test.
    assert.strictEqual(true, false, 'update this test');
  })
  it('should only allow one operator key to be depressed at a time', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  })
  it('should show new number if pressed after an operator key', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  });
  it('should add two numbers together', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  })
  it('should subtract two numbers', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  })
  it('should multiply two numbers', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  })
  it('should divide two numbers', function () {
    // write your own tests
    assert.strictEqual(true, false, 'update this test');
  })
  // write more tests below. Think about how to test for "unhappy paths". 
  // Try to break it in as many ways as you can!


});
