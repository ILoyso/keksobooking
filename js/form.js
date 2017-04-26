'use strict';

window.useForm = (function () {
  var formWrap = document.querySelector('.notice__form');
  var formSubmit = formWrap.querySelector('.form__submit');
  var formTitle = formWrap.querySelector('#title');
  var formPrice = formWrap.querySelector('#price');
  var formType = formWrap.querySelector('#type');
  var formTimeIn = formWrap.querySelector('#time');
  var formTimeOut = formWrap.querySelector('#timeout');
  var formRooms = formWrap.querySelector('#room_number');
  var formCapacity = formWrap.querySelector('#capacity');
  var formTimeValues = ['12', '13', '14'];
  var formRoomsValues = ['1', '2', '100'];
  var formCapacityValues = ['0', '3', '3'];
  var formTypeValues = ['Квартира', 'Лачуга', 'Дворец'];
  var formPriceValues = ['1000', '0', '10000'];

  formCapacity.value = formCapacityValues[0];

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(formTimeIn, formTimeOut, formTimeValues, formTimeValues, syncValues);

  window.synchronizeFields(formTimeOut, formTimeIn, formTimeValues, formTimeValues, syncValues);

  window.synchronizeFields(formRooms, formCapacity, formRoomsValues, formCapacityValues, syncValues);

  window.synchronizeFields(formCapacity, formRooms, formCapacityValues, formRoomsValues, syncValues);

  window.synchronizeFields(formType, formPrice, formTypeValues, formPriceValues, syncValues);

  var validateTitle = function () {
    var value = formTitle.value;
    if ((value.length < 30) || (value.length > 100)) {
      formTitle.setAttribute('style', 'border: 1px solid red;');
      return;
    }
    formTitle.setAttribute('style', 'border: 1px solid #d9d9d3;');
  };

  var validatePrice = function () {
    var value = formPrice.value;
    if ((value < 0) || (value > 1000000) || (value === '')) {
      formPrice.setAttribute('style', 'border: 1px solid red;');
      return;
    }
    formPrice.setAttribute('style', 'border: 1px solid #d9d9d3;');
  };

  var validateForm = function (evt) {
    var formFieldId = evt.target;
    switch (formFieldId) {
      case (formTitle):
        validateTitle();
        break;
      case (formPrice):
        validatePrice();
        break;
    }
  };

  var submitingForm = function (evt) {
    validateTitle();
    validatePrice();
  };

  formWrap.addEventListener('change', function (evt) {
    validateForm(evt);
  });

  formSubmit.addEventListener('click', function () {
    submitingForm();
  });
})();
