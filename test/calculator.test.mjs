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
        clear: document.querySelector('[data-action="clear"]')
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
      assert.strictEqual(display.textContent,'0','the display is not reset to 0')
    })

});
