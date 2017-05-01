'use strict';

window.createData = (function () {

  var dateUrl = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  (function () {
    var onLoad = function (data) {
      window.advert = data;
      window.createPins.makeRandomPins(window.advert, 3);
    };

    window.load(dateUrl, onLoad);
  })();

})();
