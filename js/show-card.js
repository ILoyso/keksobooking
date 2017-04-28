'use strict';

window.showCard = (function () {
  var description = document.querySelector('.dialog');

  var openDescription = function (advert, evt) {
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
      window.utils.removeClass('pin--active');
      clickedElementWrap.classList.add('pin--active');
      description.setAttribute('style', 'display: block;');
    }
  };

  var hideDescription = function () {
    description.setAttribute('style', 'display: none;');
    document.removeEventListener('keydown', onDescriptionEscPress);
  };

  hideDescription();

  var onDescriptionEscPress = function (evt) {
    if (window.utils.checkEscPressed(evt.keyCode)) {
      hideDescription();
    }
  };

  return {
    openDescription: openDescription,
    hideDescription: hideDescription,
  };

})();
