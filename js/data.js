'use strict';

window.createDate = (function () {

  var advert = [];
  var AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPE = ['flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var generateRandomValue = function (min, max) {
    var value = (Math.round(Math.random() * (max - min) + min));
    return value;
  };

  var searchRandomItem = function (array) {
    var randomIndex = generateRandomValue(0, array.length - 1);
    return array[randomIndex];
  };

  var searchWithoutRepeat = function (array) {
    var randomIndex = generateRandomValue(0, array.length - 1);
    var randomSearchResult = array[randomIndex];
    array.splice(randomIndex, 1);
    return randomSearchResult;
  };

  var createRandomArray = function (array) {
    var arrayMaxLength = array.length;
    var newArrayLength = generateRandomValue(1, arrayMaxLength);
    var newArray = [];
    for (var i = 0; i < newArrayLength; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  };

  var generateAdvertStats = function () {
    var advertItem = {};
    advertItem.author = {};
    advertItem.author.avatar = 'img/avatars/user' + searchWithoutRepeat(AVATARS) + '.png';
    advertItem.location = {};
    advertItem.location.x = generateRandomValue(300, 900);
    advertItem.location.y = generateRandomValue(100, 500);
    advertItem.offer = {};
    advertItem.offer.title = searchWithoutRepeat(TITLES);
    advertItem.offer.address = String(advertItem.location.x + ', ' + advertItem.location.y);
    advertItem.offer.price = generateRandomValue(1000, 1000000);
    advertItem.offer.type = searchRandomItem(OFFER_TYPE);
    advertItem.offer.rooms = generateRandomValue(1, 5);
    advertItem.offer.guests = generateRandomValue(1, 100);
    advertItem.offer.checkin = searchRandomItem(CHECKIN);
    advertItem.offer.checkout = searchRandomItem(CHECKIN);
    advertItem.offer.features = createRandomArray(FEATURES);
    advertItem.offer.description = '';
    advertItem.offer.photos = [];
    return advertItem;
  };

  return function (amount) {
    for (var i = 0; i < amount; i++) {
      advert[i] = generateAdvertStats();
    }
    return advert;
  };
})();
