'use strict';

(function () {

  var MIN_X = 50;
  var MAX_X = 1085;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 2;
  var MAX_GUESTS = 10;

  var AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];

  var TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var CHECKINS = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var infoList = [];

  var similarPinsElement = document.querySelector('.map__pins');

  var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var similarCardElement = document.querySelector('.map');
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var cardElement = similarCardTemplate.cloneNode(true);

  var fragment = document.createDocumentFragment();

  window.map = {

    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    infoList: infoList,
    similarPinsElement: similarPinsElement,
    cardElement: cardElement,
    fragment: fragment,

    createPins: function (array) {
      for (var i = 0; i < 8; i++) {

        infoList.push({
          author: {
            avatar: AVATARS[i]
          },

          offer: {
            title: TITLES[window.data.randomInteger(0, TITLES.length - 1)],
            address: window.data.randomInteger(MIN_X, MAX_X) + ', ' + window.data.randomInteger(MIN_Y, MAX_Y),
            price: window.data.randomInteger(MIN_PRICE, MAX_PRICE) + ' ₽/ночь',
            type: window.data.randomProperty(TYPES),
            rooms: window.data.randomInteger(MIN_ROOMS, MAX_ROOMS),
            guests: window.data.randomInteger(MIN_GUESTS, MAX_GUESTS),
            checkin: CHECKINS[window.data.randomInteger(0, CHECKINS.length - 1)],
            checkout: CHECKINS[window.data.randomInteger(0, CHECKINS.length - 1)],
            features: window.data.getRandomELements(FEATURES.sort(window.data.sortElements)),
            description: ' ',
            photos: PHOTOS.sort(window.data.sortElements)
          },

          location: {
            x: window.data.randomInteger(MIN_X, MAX_X),
            y: window.data.randomInteger(MIN_Y, MAX_Y)
          }
        });

        var pinsElement = similarPinsTemplate.cloneNode(true);
        pinsElement.style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px';
        pinsElement.querySelector('img').src = array[i].author.avatar;
        pinsElement.alt = 'Метка объявления';

        fragment.appendChild(pinsElement);
      }
    },

    createCard: function (array) {
      var offer = array[0].offer;
      cardElement.querySelector('img').src = array[window.data.randomInteger(0, infoList.length - 1)].author.avatar;
      cardElement.querySelector('.popup__title').textContent = offer.title;
      cardElement.querySelector('.popup__text--address').textContent = offer.address;
      cardElement.querySelector('.popup__text--price').textContent = offer.price;
      cardElement.querySelector('.popup__type').textContent = offer.type;
      cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + offer.checkin + ', ' + 'выезд до ' + offer.checkout;
      cardElement.querySelector('.popup__features').textContent = '';
      cardElement.querySelector('.popup__description').textContent = offer.description;
      cardElement.querySelector('.popup__photos').textContent = '';

      similarCardElement.appendChild(cardElement);
      cardElement.querySelector('.popup__features').appendChild(window.data.createFeatures(offer.features));
      cardElement.querySelector('.popup__photos').appendChild(window.data.createPhotos(offer.photos));
      return cardElement;
    }
  };
})();
