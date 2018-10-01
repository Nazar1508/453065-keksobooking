'use strict';

(function () {
  var MIN_X = 50;
  var MAX_X = 1085;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    pinsData: [],

    createPins: function (array, pinsQuantity) {

      window.pins.pinsData = array.sort(window.data.sortElements).filter(function (pin, index) {
        return index < pinsQuantity;
      });

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.pins.pinsData.length; i++) {
        var pinsElement = similarPinsTemplate.cloneNode(true);
        pinsElement.style = 'left: ' + parseInt(window.pins.pinsData[i].location.x, 10) + 'px; top: ' + parseInt(window.pins.pinsData[i].location.y, 10) + 'px';
        pinsElement.querySelector('img').src = array[i].author.avatar;
        pinsElement.classList.add('user__pin');
        pinsElement.id = i;
        pinsElement.alt = 'Метка объявления';

        fragment.appendChild(pinsElement);
      }
      return fragment;
    },

    removePins: function () {
      var mapPin = window.map.similarPinsElement.querySelectorAll('button');
      mapPin.forEach(function (el) {
        if (el.className !== 'map__pin map__pin--main') {
          window.map.similarPinsElement.removeChild(el);
        }
      });
    },

    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
  };
})();
