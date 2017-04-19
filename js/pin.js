'use strict';

window.createPins = (function () {
  var generateMark = function (array) {

    var newMark = document.createElement('div');
    var markImg = document.createElement('img');
    var markWidth = 40;
    var markHeight = 40;
    var coordinateX = array.location.x - (markWidth / 2);
    var coordinateY = array.location.y - markHeight;
    newMark.classList.add('pin');
    newMark.setAttribute('style', 'left: ' + coordinateX + 'px; top: ' + coordinateY + 'px;');
    markImg.classList.add('rounded');
    markImg.setAttribute('src', array.author.avatar);
    markImg.setAttribute('width', markWidth);
    markImg.setAttribute('height', markHeight);
    markImg.setAttribute('tabindex', 0);
    newMark.appendChild(markImg);
    return newMark;
  };

  return function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(generateMark(array[i]));
    }
    var marksPlace = document.querySelector('.tokyo__pin-map');
    marksPlace.appendChild(fragment);
  };
})();
