'use strict';

window.createErrorMessage = (function () {

  var createElement = function (text) {
    var errorMsg = document.createElement('div');
    errorMsg.style.cssText = 'position: fixed; bottom: 0; right: 0; padding: 10px; font-size: 14px; background-color: rgba(255, 0, 0, 0.9); width: 30%; min-height: 20px; color: #fff;';
    var errorPlace = document.querySelector('.footer');
    errorMsg.innerHTML = text;
    errorPlace.insertBefore(errorMsg, errorPlace.querySelector('.center-wrapper'));
  };

  return {
    createElement: createElement
  };

})();
