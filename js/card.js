'use strict';

(function () {
  var TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = similarCardTemplate.cloneNode(true);

  window.card = {

    createCard: function (array) {
      cardElement.querySelector('img').src = array.author.avatar;
      cardElement.querySelector('.popup__title').textContent = array.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = array.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = array.offer.price;
      cardElement.querySelector('.popup__type').textContent = TYPES[array.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = array.offer.rooms + ' комнаты для ' + array.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + array.offer.checkin + ', ' + 'выезд до ' + array.offer.checkout;
      cardElement.querySelector('.popup__features').textContent = '';
      cardElement.querySelector('.popup__description').textContent = array.offer.description;
      cardElement.querySelector('.popup__photos').textContent = '';

      cardElement.querySelector('.popup__features').appendChild(window.data.createFeatures(array.offer.features));
      cardElement.querySelector('.popup__photos').appendChild(window.data.createPhotos(array.offer.photos));
      cardElement.classList.remove('hidden');
      cardElement.querySelector('.popup__close').addEventListener('click', function () {
        cardElement.classList.add('hidden');
      });
      return cardElement;
    },
  };
})();
