'use strict';

(function () {

  var map = document.querySelector('.map');
  var similarPinsElement = document.querySelector('.map__pins');

  window.map = {
    similarPinsElement: similarPinsElement,
  };

  var showTheCard = function (obj) {
    map.appendChild(window.card.createCard(obj));
  };

  similarPinsElement.addEventListener('click', function (evt) {
    var target = evt.target;

    var successHandlerForCard = function () {
      if (target.tagName === 'BUTTON') {
        showTheCard(window.pins.pinsData[target.id]);
      } else if (target.tagName === 'IMG') {
        showTheCard(window.pins.pinsData[target.parentElement.id]);
      }
    };
    window.backend.download(successHandlerForCard, window.error.errorHandler);
  });
})();
