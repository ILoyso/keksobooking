'use strict';

window.useMap = (function () {
  var marksPlace = document.querySelector('.tokyo__pin-map');
  var descriptionClose = document.querySelector('.dialog__close');
  var currentMark = document.querySelector('.pin__main');
  var formAddress = document.querySelector('#address');

  formAddress.setAttribute('disabled', 'disabled');

  var removeClass = function (removedClass) {
    var allMarks = document.querySelectorAll('.pin');
    for (var i = 0; i < allMarks.length; i++) {
      if (allMarks[i].classList.contains(removedClass)) {
        allMarks[i].classList.remove(removedClass);
      }
    }
  };

  var currentMarkkWidth = currentMark.offsetWidth;
  var currentMarkHeight = currentMark.offsetHeight;

  var fillAddress = function () {
    var currentMarkCoordinate = currentMark.getBoundingClientRect();
    var currentMarkX = currentMarkCoordinate.left + (currentMarkkWidth / 2);
    var currentMarkY = currentMarkCoordinate.top + currentMarkHeight;

    formAddress.setAttribute('value', 'x: ' + currentMarkX + ', y: ' + currentMarkY);
  };

  fillAddress();

  var fullMap = document.querySelector('.tokyo');
  var fullMapWidth = fullMap.offsetWidth;
  var fullMapHeight = fullMap.offsetHeight;

  var moveMark = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var coordinateMapX = fullMap.getBoundingClientRect().left;
      var coordinateMapY = fullMap.getBoundingClientRect().top;
      var maxMapX = coordinateMapX + fullMapWidth;
      var maxMapY = coordinateMapY + fullMapHeight - currentMarkHeight;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((startCoords.x < coordinateMapX) || (startCoords.x > maxMapX) || (startCoords.y < coordinateMapY) || (startCoords.y > maxMapY)) {
        return;
      }

      currentMark.style.top = (currentMark.offsetTop - shift.y) + 'px';
      currentMark.style.left = (currentMark.offsetLeft - shift.x) + 'px';

      var actualX = currentMark.offsetLeft - shift.x + (currentMarkkWidth / 2);
      var actualY = currentMark.offsetTop - shift.y + currentMarkHeight;
      formAddress.value = 'x: ' + actualX + ', y: ' + actualY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  marksPlace.addEventListener('click', function (evt) {
    window.showCard.openDescription(window.advert, evt);
  });

  marksPlace.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      window.showCard.openDescription(window.advert, evt);
    }
  });

  descriptionClose.addEventListener('click', function (evt) {
    window.showCard.hideDescription();
    removeClass('pin--active');
  });

  descriptionClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      window.showCard.hideDescription();
      removeClass('pin--active');
    }
  });

  currentMark.addEventListener('mousedown', function (evt) {
    moveMark(evt);
  });

  return {
    removeClass: removeClass
  };
})();


