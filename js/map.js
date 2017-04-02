'use strict';

var advert = [];
var amountOfAdvert = 8;
var AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var marksPlace = document.querySelector('.tokyo__pin-map');
var descriptionTemplate = document.querySelector('#lodge-template').content;
var descriptionPlace = document.querySelector('.dialog__panel');

function generateRandomValue(min, max) {
  var value = (Math.round(Math.random() * (max - min) + min));
  return value;
}

function searchRandomItem(array) {
  var randomIndex = generateRandomValue(0, array.length - 1);
  return array[randomIndex];
}

function searchWithoutRepeat(array) {
  var randomIndex = generateRandomValue(0, array.length - 1);
  var randomSearchResult = array[randomIndex];
  array.splice(randomIndex, 1);
  return randomSearchResult;
}

function createRandomArray(array) {
  var arrayMaxLength = array.length;
  var newArrayLength = generateRandomValue(1, arrayMaxLength);
  var newArray = [];
  for (var i = 0; i < newArrayLength; i++) {
    newArray[i] = array[i];
  }
  return newArray;
}

function generateAdvertStats() {
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
}

function createAdvert(amount) {
  for (var i = 0; i < amount; i++) {
    advert[i] = generateAdvertStats();
  }
}

createAdvert(amountOfAdvert);

function generateMark(array) {
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
  newMark.appendChild(markImg);
  return newMark;
}

function createFragments(array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(generateMark(array[i]));
  }
  marksPlace.appendChild(fragment);
}

createFragments(advert);

function generateDescription(array) {
  var newDescription = descriptionTemplate.cloneNode(true);
  newDescription.querySelector('.lodge__title').textContent = array.offer.title;
  newDescription.querySelector('.lodge__address').textContent = array.offer.address;
  newDescription.querySelector('.lodge__price').innerHTML = array.offer.price + '\&#x20bd; /ночь';

  function translateOfferType(type) {
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
  }

  newDescription.querySelector('.lodge__type').textContent = translateOfferType(array.offer.type);
  newDescription.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + array.offer.guests + ' гостей в ' + array.offer.rooms + ' комнатах';
  newDescription.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;

  function generateSpanFeatures(featureValue) {
    var newSpan = document.createElement('span');
    newSpan.classList.add('feature__image', 'feature__image--' + featureValue);
    return newSpan;
  }

  function createSpanFeatures(featuresArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < featuresArray.length; i++) {
      fragment.appendChild(generateSpanFeatures(featuresArray[i]));
    }
    newDescription.querySelector('.lodge__features').appendChild(fragment);
  }

  createSpanFeatures(array.offer.features);

  newDescription.querySelector('.lodge__description').textContent = array.offer.description;
  return newDescription;
}

function createDescriptions(advertInfo) {
  var fragment = document.createDocumentFragment();
  var parentDiv = descriptionPlace.parentNode;
  fragment.appendChild(generateDescription(advertInfo));
  parentDiv.replaceChild(fragment, descriptionPlace);

  var avatar = document.querySelector('.dialog__title').querySelector('img');
  avatar.setAttribute('src', advertInfo.author.avatar);
}

createDescriptions(advert[0]);
