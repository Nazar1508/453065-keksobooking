'use strict';

(function () {
  var MIN_X = 50;
  var MAX_X = 1085;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    createPins: function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < 8; i++) {
        var pinsElement = similarPinsTemplate.cloneNode(true);
        pinsElement.style = 'left: ' + parseInt(array[i].location.x, 10) + 'px; top: ' + parseInt(array[i].location.y, 10) + 'px';
        pinsElement.querySelector('img').src = array[i].author.avatar;
        pinsElement.id = i;
        pinsElement.alt = 'Метка объявления';

        fragment.appendChild(pinsElement);
      }
      return fragment;
    },

    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
  };
})();
