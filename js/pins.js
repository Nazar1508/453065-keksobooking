'use strict';

(function () {
  var MIN_X = 0;
  var MAX_X = 1136;
  var MIN_Y = 100;
  var MAX_Y = 620;
  var fragment;

  window.pins = {
    infoOfpins: [],
    similarPinsTemplate: document.querySelector('#pin').content.querySelector('.map__pin'),

    renderPinItem: function (element, i) {
      var pinsElement = window.pins.similarPinsTemplate.cloneNode(true);
      pinsElement.style.left = parseInt(element.location.x, 10) + 'px';
      pinsElement.style.top = parseInt(element.location.y, 10) + 'px';
      pinsElement.querySelector('img').src = element.author.avatar;
      pinsElement.id = i;
      pinsElement.alt = 'Метка объявления';

      fragment.appendChild(pinsElement);
    },

    createPins: function (array, pinsQuantity) {

      window.pins.infoOfpins = array.sort(window.data.sortElements).filter(function (pin, index) {
        return index < pinsQuantity;
      });
      fragment = document.createDocumentFragment();
      for (var i = 0; i < window.pins.infoOfpins.length; i++) {
        window.pins.renderPinItem(window.pins.infoOfpins[i], i);
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
