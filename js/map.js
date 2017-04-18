'use strict';

var marksPlace = document.querySelector('.tokyo__pin-map');
var description = document.querySelector('.dialog');
var descriptionClose = document.querySelector('.dialog__close');

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

  return {
    hideDescription: hideDescription,
    openDescription: openDescription,
    removeClass: removeClass
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

descriptionClose.addEventListener('click', function () {
  window.useMap.hideDescription(description);
  window.useMap.removeClass('pin--active');
});

descriptionClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    window.useMap.hideDescription(description);
    window.useMap.removeClass('pin--active');
  }
});

