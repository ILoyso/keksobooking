'use strict';

window.synchronizeFields = (function (firstField, secodField, firstValue, secondValue, callback) {
  firstField.addEventListener('change', function () {
    if (typeof (callback) === 'function') {
      var order = firstValue.indexOf(firstField.value);
      var finalValue = secondValue[order];
      callback(secodField, finalValue);
    }
  });
});
