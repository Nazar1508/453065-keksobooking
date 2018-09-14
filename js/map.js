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


(function () {

  var infoList = [];

  var similarPinsElement = document.querySelector('.map__pins');
  var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var similarCardElement = document.querySelector('.map');
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var cardElement = similarCardTemplate.cloneNode(true);

  // Создаем функцию для создания случайных чисел
  var randomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };

  // Создаем функцию для возврата случайного свойства из объекта
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

  // Создаем функцию, которая будет возвращать случайную количество элементов из массива
  var getRandomELements = function (array) {
    var randomElements = array.slice(0, randomInteger(1, array.length));
    return randomElements;
  };

  // Создаем функцию для случайной сортировки елементов масива
  var sortElements = function () {
    return 0.5 - Math.random();
  };

  var fragment = document.createDocumentFragment();


  var createPins = function (array) {
    for (var i = 0; i < 8; i++) {

      infoList.push({
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
      });

      var pinsElement = similarPinsTemplate.cloneNode(true);
      pinsElement.style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px';
      pinsElement.querySelector('img').src = array[i].author.avatar;
      pinsElement.alt = 'Метка объявления';

      fragment.appendChild(pinsElement);
    }

  };

  // createPins(infoList);

  var createCard = function (array) {
    var offer = array[0].offer;
    cardElement.querySelector('img').src = array[randomInteger(0, infoList.length - 1)].author.avatar;
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
    cardElement.querySelector('.popup__features').appendChild(createFeatures(offer.features));
    cardElement.querySelector('.popup__photos').appendChild(createPhotos(offer.photos));
    return cardElement;
  };

  // createCard(infoList);

  var form = document.querySelector('.ad-form');
  var addFormElements = document.querySelectorAll('fieldset, select');
  var mapPinActive = document.querySelector('.map__pin--main');
  form.querySelector('.ad-form__element:nth-child(3) input').value = parseInt(mapPinActive.style.top, 15) + ', ' + parseInt(mapPinActive.style.left, 15);

  mapPinActive.addEventListener('mouseup', function () {
    document.querySelector('.map').classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    form.querySelector('.ad-form__element:nth-child(3) input').value = parseInt(mapPinActive.style.top, 15) + ', ' + parseInt(mapPinActive.style.left, 15);

    for (var i = 0; i < addFormElements.length; i++) {
      addFormElements[i].disabled = false;
    }

    createPins(infoList);
    similarPinsElement.appendChild(fragment);
  });

  mapPinActive.addEventListener('mousedown', function (evt) {
    var startPositin = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvent) {
      var changePosition = {
        x: startPositin.x - moveEvent.clientX,
        y: startPositin.y - moveEvent.clientY,
      };

      startPositin = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      mapPinActive.style.top = (mapPinActive.offsetTop - changePosition.y) + 'px';
      mapPinActive.style.left = (mapPinActive.offsetLeft - changePosition.x) + 'px';
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);


  });

  similarPinsElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON') {
      createCard(infoList);
      cardElement.classList.remove('hidden');
    } else if (target.tagName === 'IMG') {
      createCard(infoList);
      cardElement.classList.remove('hidden');
    }
  });

  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    cardElement.classList.add('hidden');
  });

  var roomNumber = form.querySelector('#room_number');
  var roomNumberElement = form.querySelectorAll('#room_number > option');
  var roomCapacity = form.querySelectorAll('#capacity > option');

  roomNumber.addEventListener('click', function () {
    for (var i = 0; i < roomNumber.length; i++) {
      if (roomNumberElement[i].selected && roomNumberElement[i].value === '1') {
        roomCapacity[0].disabled = true;
        roomCapacity[1].disabled = true;
        roomCapacity[2].disabled = false;
        roomCapacity[3].disabled = true;
        roomCapacity[2].selected = 'true';
      } else if (roomNumberElement[i].selected && roomNumberElement[i].value === '2') {
        roomCapacity[0].disabled = true;
        roomCapacity[1].disabled = false;
        roomCapacity[2].disabled = false;
        roomCapacity[3].disabled = true;
        roomCapacity[2].selected = 'true';
      } else if (roomNumberElement[i].selected && roomNumberElement[i].value === '3') {
        roomCapacity[0].disabled = false;
        roomCapacity[1].disabled = false;
        roomCapacity[2].disabled = false;
        roomCapacity[3].disabled = true;
        roomCapacity[2].selected = 'true';
      } else if (roomNumberElement[i].selected && roomNumberElement[i].value === '100') {
        roomCapacity[0].disabled = true;
        roomCapacity[1].disabled = true;
        roomCapacity[2].disabled = true;
        roomCapacity[3].disabled = false;
        roomCapacity[3].selected = 'true';
      }
    }
  });
}());
