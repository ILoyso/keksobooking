'use strict';

var marksPlace = document.querySelector('.tokyo__pin-map');
var description = document.querySelector('.dialog');
var descriptionClose = document.querySelector('.dialog__close');
var currentMark = document.querySelector('.pin__main');
var formAddress = document.querySelector('#address');

window.useMap = (function () {
  var amountOfAdvert = 8;

  var advert = window.createDate(amountOfAdvert);
  window.createPins(advert);

  var removeClass = function (removedClass) {
    var allMarks = document.querySelectorAll('.pin');
    for (var i = 0; i < allMarks.length; i++) {
      if (allMarks[i].classList.contains(removedClass)) {
        allMarks[i].classList.remove(removedClass);
      }
    }
  };

  var openDescription = function (evt) {
    var clickedElement = evt.target;
    var clickedElementWrap = clickedElement.parentNode;

    if ((clickedElement.classList.contains('rounded')) & !(clickedElementWrap.classList.contains('pin__main'))) {
      var imageSrc = clickedElement.getAttribute('src');

      for (var i = 0; i < advert.length; i++) {
        if (advert[i].author.avatar === imageSrc) {
          var order = i;
        }
      }
      window.createCards(advert[order]);

      document.addEventListener('keydown', onDescriptionEscPress);
      removeClass('pin--active');
      clickedElementWrap.classList.add('pin--active');
      description.setAttribute('style', 'display: block;');
    }
  };

  var hideDescription = function (block) {
    block.setAttribute('style', 'display: none;');
    document.removeEventListener('keydown', onDescriptionEscPress);
  };

  hideDescription(description);

  var onDescriptionEscPress = function (evt) {
    if (evt.keyCode === 27) {
      hideDescription(description);
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

      if ((startCoords.x < 100) || (startCoords.x > 1280) || (startCoords.y < 50) || (startCoords.y > 610)) {
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

    if (coordsArray[1] > (710 - currentMarkHeight)) {
      coordsArray[1] = 710;
    } else if (coordsArray[1] < (0 + currentMarkHeight)) {
      coordsArray[1] = (0 + currentMarkHeight);
    }

    if (coordsArray[0] > (1200 - currentMarkkWidth / 2)) {
      coordsArray[0] = 1200;
    } else if (coordsArray[0] < (0 + currentMarkkWidth / 2)) {
      coordsArray[0] = (0 + currentMarkkWidth / 2);
    }

    currentMark.style.top = coordsArray[1] - currentMarkHeight + 'px';
    currentMark.style.left = coordsArray[0] - (currentMarkkWidth / 2) + 'px';
  };

  return {
    hideDescription: hideDescription,
    openDescription: openDescription,
    removeClass: removeClass,
    moveMark: moveMark,
    positionMainMark: positionMainMark
  };
})();

marksPlace.addEventListener('click', function (evt) {
  window.useMap.openDescription(evt);
});

marksPlace.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    window.useMap.openDescription(evt);
  }
});

descriptionClose.addEventListener('click', function (evt) {
  window.useMap.hideDescription(description);
  window.useMap.removeClass('pin--active');
});

descriptionClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    window.useMap.hideDescription(description);
    window.useMap.removeClass('pin--active');
  }
});

currentMark.addEventListener('mousedown', function (evt) {
  window.useMap.moveMark(evt);
});

formAddress.addEventListener('change', function () {
  window.useMap.positionMainMark(formAddress.value);
});
