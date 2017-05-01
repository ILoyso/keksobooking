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

  var houseType = document.querySelector('#housing_type');
  var housePrice = document.querySelector('#housing_price');
  var houseRoomsCount = document.querySelector('#housing_room-number');
  var houseGuestCount = document.querySelector('#housing_guests-number');
  var houseTypeValue = houseType.value;
  var housePriceValue = housePrice.value;
  var houseRoomsValue = houseRoomsCount.value;
  var houseGuestValue = houseGuestCount.value;

  var updatePins = function () {
    var anyValue = 'any';

    var houseTypeFilter = window.advert.filter(function (it) {
      if (!(houseTypeValue === anyValue)) {
        return it.offer.type === houseTypeValue;
      }
      return it.offer.type;
    });

    var housePriceFilter = houseTypeFilter.filter(function (it) {
      switch (housePriceValue) {
        case 'low':
          return it.offer.price < 10000;
        case 'high':
          return it.offer.price > 50000;
        case 'middle':
          if ((it.offer.price > 10000) & (it.offer.price < 50000)) {
            return it.offer.price;
          }
          break;
      }
      return null;
    });

    var houseRoomsFilter = housePriceFilter.filter(function (it) {
      if (!(houseRoomsValue === anyValue)) {
        return it.offer.rooms === Number(houseRoomsValue);
      }
      return it.offer.rooms;
    });

    var houseGuestFilter = houseRoomsFilter.filter(function (it) {
      if (!(houseGuestValue === anyValue)) {
        return it.offer.guests === Number(houseGuestValue);
      }
      return it.offer.guests;
    });

    var checkboxAll = document.querySelectorAll('#housing_features input');

    checkboxAll.forEach(function (feature) {
      if (feature.checked) {
        houseGuestFilter = houseGuestFilter.filter(function (element) {
          return element.offer.features.indexOf(feature.value) >= 0;
        });
      }
    });

    window.createPins.makePins(houseGuestFilter);
  };

  var checkFilterChanges = function (evt) {
    var filterChanged = evt.target;

    switch (filterChanged) {
      case houseType:
        houseTypeValue = filterChanged.value;
        break;
      case housePrice:
        housePriceValue = filterChanged.value;
        break;
      case houseRoomsCount:
        houseRoomsValue = filterChanged.value;
        break;
      case houseGuestCount:
        houseGuestValue = filterChanged.value;
        break;
    }

    window.debounce(updatePins);
  };

  var filtersContainer = document.querySelector('.tokyo__filters');

  filtersContainer.addEventListener('change', function (evt) {
    checkFilterChanges(evt);
  });

  var removePins = function () {
    var allPins = document.querySelectorAll('.pin');
    allPins.forEach(function (item, i, array) {
      if (!(item.classList.contains('pin__main'))) {
        item.remove();
      }
    });
  };

  var makeRandomPins = function (array, count) {
    var tempArray = array;
    var finalRandomArray = [];
    var randomValue;
    for (var i = 0; i < count; i++) {
      randomValue = (Math.round(Math.random() * (array.length - 1 - 0) + 0));
      finalRandomArray[i] = tempArray[randomValue];
      tempArray.splice(randomValue, 1);
    }
    makePins(finalRandomArray);
  };

  var makePins = function (array) {
    var fragment = document.createDocumentFragment();
    removePins();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(generateMark(array[i]));
    }
    var marksPlace = document.querySelector('.tokyo__pin-map');
    marksPlace.appendChild(fragment);
  };

  return {
    makePins: makePins,
    updatePins: updatePins,
    makeRandomPins: makeRandomPins
  };
})();

