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

  var houseFeaturesList = document.querySelector('#housing_features');
  var checkboxAll = houseFeaturesList.getElementsByTagName('input');
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

    var sameTypeOfHouse = window.advert.filter(function (it) {
      if (!(houseTypeValue === anyValue)) {
        return it.offer.type === houseTypeValue;
      }
      return it.offer.type;
    });

    var samePriceOfHouse = window.advert.filter(function (it) {
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

    var sameRoomsInHouse = window.advert.filter(function (it) {
      if (!(houseRoomsValue === anyValue)) {
        return it.offer.rooms === Number(houseRoomsValue);
      }
      return it.offer.rooms;
    });

    var sameGuestInHouse = window.advert.filter(function (it) {
      if (!(houseGuestValue === anyValue)) {
        return it.offer.guests === Number(houseGuestValue);
      }
      return it.offer.guests;
    });

    var sameFeatures = window.advert.filter(function (it) {
      for (var i = 0; i < checkboxAll.length; i++) {
        if (checkboxAll[i].checked) {
          if (it.offer.features[i] === checkboxAll[i].value) {
            return it.offer.features[i];
          }
        }
      }
      return null;
    });

    var filteredPins = sameTypeOfHouse;
    filteredPins = filteredPins.concat(samePriceOfHouse);
    filteredPins = filteredPins.concat(sameRoomsInHouse);
    filteredPins = filteredPins.concat(sameGuestInHouse);
    filteredPins = filteredPins.concat(sameFeatures);

    window.createPins.makePins(filteredPins);
  };

  houseType.addEventListener('change', function (evt) {
    houseTypeValue = evt.target.value;
    window.debounce(updatePins);
  });

  housePrice.addEventListener('change', function (evt) {
    housePriceValue = evt.target.value;
    window.debounce(updatePins);
  });

  houseRoomsCount.addEventListener('change', function (evt) {
    houseRoomsValue = evt.target.value;
    window.debounce(updatePins);
  });

  houseGuestCount.addEventListener('change', function (evt) {
    houseGuestValue = evt.target.value;
    window.debounce(updatePins);
  });

  houseFeaturesList.addEventListener('change', function (evt) {
    checkboxAll = houseFeaturesList.getElementsByTagName('input');
    window.debounce(updatePins);
  });

  var removePins = function () {
    var allPins = document.querySelectorAll('.pin');
    allPins.forEach(function (item, i, array) {
      if (!(item.classList.contains('pin__main'))) {
        item.remove();
      }
    });
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
    updatePins: updatePins
  };
})();

