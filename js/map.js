'use strict';

var MIN_X = 0;
var MAX_X = 1050;
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

var createAd = function () {

  var infoList = [];

  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var similarPinsElement = document.querySelector('.map__pins');
  var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var similarCardElement = document.querySelector('.map');
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Создаем функцию для создания случайных чисел
  var randomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };

  // Создаем функцию для возврата случайной свойства с объекта
  var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys [keys.length * Math.random() << 0]];
  };

  // Создаем функцию для добавления li в DOM
  var createFeatures = function (array) {
    var featuresFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var featuresItem = document.createElement('li');
      featuresItem.className = 'popup__feature popup__feature--' + array[i];
      featuresFragment.appendChild(featuresItem);
    }
    return featuresFragment;
  };

  // Создаем функцию для добавления img в DOM
  var createPhotos = function (array) {
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var photo = document.createElement('img');
      photo.className = 'popup__photo';
      photo.src = array[i];
      photo.width = '45';
      photo.height = '40';
      photo.alt = 'Фотография жилья';
      photosFragment.appendChild(photo);
    }
    return photosFragment;
  };

  // Создаем функцию, которая будет возвращать случайную количество элементов с массива
  var getRandomELements = function (array) {
    var randomElements = [];
    for (var i = 0; i < randomInteger(1, array.length); i++) {
      randomElements[i] = array[i];
    }
    return randomElements;
  };

  // Создаем функцию для случайной сортировки елементов масива
  var sortElements = function () {
    return 0.5 - Math.random();
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    var pinsElement = similarPinsTemplate.cloneNode(true);

    infoList[i] = {
      author: {
        avatar: AVATARS[i]
      },

      offer: {
        title: TITLES[randomInteger(0, TITLES.length - 1)],
        address: randomInteger(MIN_X, MAX_X) + ', ' + randomInteger(MIN_Y, MAX_Y),
        price: randomInteger(MIN_PRICE, MAX_PRICE) + ' ₽/ночь',
        type: randomProperty(TYPES),
        rooms: randomInteger(MIN_ROOMS, MAX_ROOMS),
        guests: randomInteger(MIN_GUESTS, MAX_GUESTS),
        checkin: CHECKINS[randomInteger(0, CHECKINS.length - 1)],
        checkout: CHECKINS[randomInteger(0, CHECKINS.length - 1)],
        features: getRandomELements(FEATURES.sort(sortElements)),
        description: ' ',
        photos: PHOTOS.sort(sortElements)
      },

      location: {
        x: randomInteger(MIN_X, MAX_X),
        y: randomInteger(MIN_Y, MAX_Y)
      }
    };

    pinsElement.style = 'left: ' + infoList[i].location.x + 'px; top: ' + infoList[i].location.y + 'px';
    pinsElement.querySelector('img').src = infoList[i].author.avatar;
    pinsElement.alt = 'Метка объявления';

    fragment.appendChild(pinsElement);
  }

  similarPinsElement.appendChild(fragment);

  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('img').src = infoList[randomInteger(0, infoList.length - 1)].author.avatar;
  cardElement.querySelector('.popup__title').textContent = infoList[0].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = infoList[0].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = infoList[0].offer.price;
  cardElement.querySelector('.popup__type').textContent = infoList[0].offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = infoList[0].offer.rooms + ' комнаты для ' + infoList[0].offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + infoList[0].offer.checkin + ', ' + 'выезд до ' + infoList[0].offer.checkout;
  cardElement.querySelector('.popup__features').textContent = '';
  cardElement.querySelector('.popup__description').textContent = infoList[0].offer.description;
  cardElement.querySelector('.popup__photos').textContent = '';

  similarCardElement.appendChild(cardElement);
  cardElement.querySelector('.popup__features').appendChild(createFeatures(infoList[0].offer.features));
  cardElement.querySelector('.popup__photos').appendChild(createPhotos(infoList[0].offer.photos));
};

createAd();
