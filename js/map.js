'use strict';

(function () {

  var map = document.querySelector('.map');
  var similarPinsElement = document.querySelector('.map__pins');

  window.map = {
    similarPinsElement: similarPinsElement,
    ESC_KEYCODE: 27
  };

  var showTheCard = function (obj) {
    map.appendChild(window.card.createCard(obj));
  };

  var closePopup = window.card.cardElement.querySelector('.popup__close');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.map.ESC_KEYCODE) {
      closeCard();
    }
  };

  var openCard = function () {
    window.card.cardElement.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeCard = function () {
    window.card.cardElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  similarPinsElement.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.tagName === 'BUTTON' && target.className !== 'map__pin map__pin--main') {
      showTheCard(window.pins.pinsData[target.id]);
    } else if (target.tagName === 'IMG' && target.parentElement.className !== 'map__pin map__pin--main') {
      showTheCard(window.pins.pinsData[target.parentElement.id]);
    }
    openCard();
  });

  closePopup.addEventListener('click', function () {
    closeCard();
  });
})();
