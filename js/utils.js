'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  var checkEnterPressed = function (keyCode) {
    if (keyCode === ENTER_KEY_CODE) {
      return true;
    }
    return false;
  };

  var checkEscPressed = function (keyCode) {
    if (keyCode === ESC_KEY_CODE) {
      return true;
    }
    return false;
  };

  var removeClass = function (removedClass) {
    var allMarks = document.querySelectorAll('.pin');
    for (var i = 0; i < allMarks.length; i++) {
      if (allMarks[i].classList.contains(removedClass)) {
        allMarks[i].classList.remove(removedClass);
      }
    }
  };

  return {
    removeClass: removeClass,
    checkEnterPressed: checkEnterPressed,
    checkEscPressed: checkEscPressed
  };
})();


