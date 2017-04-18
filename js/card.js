'use strict';

window.createCards = (function () {
  var descriptionTemplate = document.querySelector('#lodge-template').content;

  var generateDescription = function (array) {
    var newDescription = descriptionTemplate.cloneNode(true);
    newDescription.querySelector('.lodge__title').textContent = array.offer.title;
    newDescription.querySelector('.lodge__address').textContent = array.offer.address;
    newDescription.querySelector('.lodge__price').innerHTML = array.offer.price + '\&#x20bd; /ночь';

    var translateOfferType = function (type) {
      var typeResult;
      switch (type) {
        case 'flat':
          typeResult = 'Квартира';
          break;
        case 'house':
          typeResult = 'Дом';
          break;
        case 'bungalo':
          typeResult = 'Бунгало';
          break;
      }
      return typeResult;
    };

    newDescription.querySelector('.lodge__type').textContent = translateOfferType(array.offer.type);
    newDescription.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + array.offer.guests + ' гостей в ' + array.offer.rooms + ' комнатах';
    newDescription.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;

    var generateSpanFeatures = function (featureValue) {
      var newSpan = document.createElement('span');
      newSpan.classList.add('feature__image', 'feature__image--' + featureValue);
      return newSpan;
    };

    var createSpanFeatures = function (featuresArray) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < featuresArray.length; i++) {
        fragment.appendChild(generateSpanFeatures(featuresArray[i]));
      }
      newDescription.querySelector('.lodge__features').appendChild(fragment);
    };

    createSpanFeatures(array.offer.features);

    newDescription.querySelector('.lodge__description').textContent = array.offer.description;
    return newDescription;
  };

  return function (advertInfo) {
    var descriptionPlace = document.querySelector('.dialog__panel');
    var fragment = document.createDocumentFragment();
    var parentDiv = descriptionPlace.parentNode;
    fragment.appendChild(generateDescription(advertInfo));
    parentDiv.replaceChild(fragment, descriptionPlace);

    var avatar = document.querySelector('.dialog__title').querySelector('img');
    avatar.setAttribute('src', advertInfo.author.avatar);
  };
})();
