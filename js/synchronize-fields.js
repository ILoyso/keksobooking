'use strict';

window.synchronizeFields = (function (firstField, secodField, firstValue, secondValue, callback) {
  firstField.addEventListener('change', function () {
    var order = firstValue.indexOf(firstField.value);
    var finalValue = secondValue[order];
    return callback(secodField, finalValue);
  });
});
