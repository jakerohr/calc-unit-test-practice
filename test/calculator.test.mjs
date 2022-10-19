import assert from 'assert';
// import jsdom from ('jsdom');
import { JSDOM } from 'jsdom';
// import fs from ('fs');
import path from 'path';
import { initCalc } from '../public/javascripts/modules/calculator.mjs';
let display;
describe('calculator', function () {
    let dom;
    before(async function () {
      dom = await JSDOM.fromFile(
        path.resolve('public/index.html'),

      );
      await new Promise((resolve) =>
        dom.window.addEventListener('load', resolve)
      );
      
      global.document = dom.window.document;
      display = document.querySelector('.calculator__display');
    });
    this.beforeEach(function () {
      initCalc();
    });
  it('should display a number if number key is pressed', function () {
    const numberOne = document.querySelector('[data-id="1"]');
    console.log(numberOne)
    numberOne.click();
    assert.strictEqual(
      display.textContent,
      '1',
      'output did not equal number 1'
    );
  });
  it('should append a number if a second number key is pressed', function () {
    const numberOne = document.querySelector('[data-id="1"]');
    const numberTwo = document.querySelector('[data-id="2"]');
    console.log(numberOne)
    numberOne.click();
    numberTwo.click();
    assert.strictEqual(
      display.textContent,
      '12',
      'output did not equal number 12'
    );
  });

});
