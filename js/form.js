'use strict';
var formWrap = document.querySelector('.notice__form');
var formSubmit = formWrap.querySelector('.form__submit');

window.useForm = (function () {

  var formTitle = formWrap.querySelector('#title');
  var formPrice = formWrap.querySelector('#price');
  var formType = formWrap.querySelector('#type');
  var formTimeIn = formWrap.querySelector('#time');
  var formTimeOut = formWrap.querySelector('#timeout');
  var formRooms = formWrap.querySelector('#room_number');
  var formCapacity = formWrap.querySelector('#capacity');


  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(formTimeIn, formTimeOut, ['12', '13', '14'], ['12', '13', '14'], syncValues);

  window.synchronizeFields(formTimeOut, formTimeIn, ['12', '13', '14'], ['12', '13', '14'], syncValues);

  window.synchronizeFields(formRooms, formCapacity, ['1', '2', '100'], ['0', '3', '3'], syncValues);

  window.synchronizeFields(formCapacity, formRooms, ['0', '3', '3'], ['1', '2', '100'], syncValues);

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

  var validatePriceByType = function (typeValue) {
    switch (typeValue) {
      case ('Лачуга'):
        formPrice.value = 0;
        break;
      case ('Квартира'):
        formPrice.value = 1000;
        break;
      case ('Дворец'):
        formPrice.value = 10000;
        break;
    }
  };

  var validateType = function () {
    var typeValue = formType.value;
    validatePriceByType(typeValue);
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
      case (formType):
        validateType();
        break;
    }
  };

  var submitingForm = function (evt) {
    validateTitle();
    validatePrice();
  };

  return {
    validateForm: validateForm,
    submitingForm: submitingForm
  };
})();

formWrap.addEventListener('change', function (evt) {
  window.useForm.validateForm(evt);
});

formSubmit.addEventListener('click', function () {
  window.useForm.submitingForm();
});
