'use strict';

window.createDate = (function () {

  var dateUrl = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  (function () {
    var onLoad = function (data) {
      window.advert = data;

      // window.createPins.makePins(window.advert);
      window.createPins.updatePins();

    };

    window.load(dateUrl, onLoad);
  })();

})();
