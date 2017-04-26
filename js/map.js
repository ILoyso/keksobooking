'use strict';

var marksPlace = document.querySelector('.tokyo__pin-map');
var descriptionClose = document.querySelector('.dialog__close');
var currentMark = document.querySelector('.pin__main');
var formAddress = document.querySelector('#address');

var amountOfAdvert = 8;
var advert = window.createDate(amountOfAdvert);
window.createPins(advert);

window.useMap = (function () {

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
  var coordinateMapX = fullMap.getBoundingClientRect().left;
  var coordinateMapY = fullMap.getBoundingClientRect().top;
  var minMapX = coordinateMapX + (currentMarkkWidth / 2);
  var minMapY = coordinateMapY + currentMarkHeight;
  var maxMapX = coordinateMapX + fullMapWidth;
  var maxMapY = coordinateMapY + fullMapHeight - currentMarkHeight;

  var moveMark = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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

  var positionMainMark = function (value) {
    var coordsArray = value.split(',');

    for (var i = 0; i < coordsArray.length; i++) {
      while (isNaN(coordsArray[i])) {
        coordsArray[i] = coordsArray[i].slice(1);
      }
      coordsArray[i] = +coordsArray[i];
    }

    if (coordsArray[1] > maxMapY) {
      coordsArray[1] = maxMapY;
    } else if (coordsArray[1] < minMapY) {
      coordsArray[1] = minMapY;
    }

    if (coordsArray[0] > maxMapX) {
      coordsArray[0] = maxMapX;
    } else if (coordsArray[0] < minMapX) {
      coordsArray[0] = minMapX;
    }

    currentMark.style.top = coordsArray[1] - currentMarkHeight + 'px';
    currentMark.style.left = coordsArray[0] - (currentMarkkWidth / 2) + 'px';
  };

  return {
    removeClass: removeClass,
    moveMark: moveMark,
    positionMainMark: positionMainMark
  };
})();

marksPlace.addEventListener('click', function (evt) {
  window.showCard.openDescription(advert, evt);
});

marksPlace.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    window.showCard.openDescription(advert, evt);
  }
});

descriptionClose.addEventListener('click', function (evt) {
  window.showCard.hideDescription();
  window.useMap.removeClass('pin--active');
});

descriptionClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    window.showCard.hideDescription();
    window.useMap.removeClass('pin--active');
  }
});

currentMark.addEventListener('mousedown', function (evt) {
  window.useMap.moveMark(evt);
});

formAddress.addEventListener('change', function () {
  window.useMap.positionMainMark(formAddress.value);
});
