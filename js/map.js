'use strict';

(function () {

  var map = document.querySelector('.map');
  var similarPinsElement = document.querySelector('.map__pins');

  window.map = {
    similarPinsElement: similarPinsElement,
  };

  similarPinsElement.addEventListener('click', function (evt) {
    var target = evt.target;

    var successHandlerForCard = function (data) {
      if (target.tagName === 'BUTTON') {
        map.appendChild(window.card.createCard(data[target.id]));
      } else if (target.tagName === 'IMG') {
        map.appendChild(window.card.createCard(data[target.parentElement.id]));
      }
    };
    window.backend.download(successHandlerForCard, window.error.errorHandler);
  });
})();
