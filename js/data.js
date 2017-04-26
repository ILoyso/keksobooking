'use strict';

window.createDate = (function () {

  var dateUrl = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  (function () {
    var onLoad = function (data) {
      window.advert = data;
      window.createPins(window.advert);
    };

    window.load(dateUrl, onLoad);
  })();

})();
