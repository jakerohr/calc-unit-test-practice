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
        path.resolve('public/index.html'),
  
      );
      await new Promise((resolve) =>
        dom.window.addEventListener('load', resolve)
      );
      
      global.document = dom.window.document;
      display = document.querySelector('.calculator__display');
      button = {
        one: document.querySelector('[data-id="1"]'),
        two: document.querySelector('[data-id="2"]'),
        three: document.querySelector('[data-id="3"]'),
        six: document.querySelector('[data-id="6"]'),
        clear: document.querySelector('[data-action="clear"]'),
        decimal: document.querySelector('[data-action="decimal"]'),
        add: document.querySelector('[data-action="add"]'),
        subtract: document.querySelector('[data-action="subtract"]'),
        multiply: document.querySelector('[data-action="multiply"]'),
        divide: document.querySelector('[data-action="divide"]'),
        calculate: document.querySelector('[data-action="calculate"]'),
      }
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
    button.one.click();
    button.clear.click();
    assert.strictEqual(display.textContent, '0', 'the display is not reset to 0')
  });
  it('should add a decimal to a number', function () {
    button.one.click();
    button.decimal.click();
    button.two.click();
    assert.strictEqual(display.textContent, '1.2', 'the display did not add a decimal');
  });
  it('should show operator keys as depressed when clicked', function () {
    button.add.click();
    const depressedElments = document.querySelector('.is-depressed');
    assert.ok(depressedElments, 'there were no depressed keys.')
  })
  it('should only allow one operator key to be as depressed', function () {
    button.add.click();
    button.subtract.click();
    const depressedElments = document.querySelectorAll('.is-depressed');
    assert.strictEqual(depressedElments.length, 1, 'there were more than one depressed keys.')
  })
  it('should show new number if pressed after an operator key', function () {
    button.one.click();
    button.add.click();
    button.two.click();
    assert.strictEqual(display.textContent, '2', 'the display does not show the number pressed after an operator')
  });
  it('should add two numbers together', function () {
    button.one.click();
    button.add.click();
    button.two.click();
    button.calculate.click();
    assert.strictEqual(display.textContent, '3', 'display did not add two numbers together');
  })
  it('should subtract two numbers', function () {
    button.three.click();
    button.subtract.click();
    button.one.click();
    button.calculate.click();
    assert.strictEqual(display.textContent, '2', 'display did not subtract two numbers.');
  })
  it('should multiply two numbers', function () {
    button.three.click();
    button.multiply.click();
    button.two.click();
    button.calculate.click();
    assert.strictEqual(display.textContent, '6', 'display did not multiply two numbers.');
  })
  it('should multiply two numbers', function () {
    button.six.click();
    button.divide.click();
    button.two.click();
    button.calculate.click();
    assert.strictEqual(display.textContent, '3', 'display did not multiply two numbers.');
  })

});
