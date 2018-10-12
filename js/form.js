'use strict';

(function () {

  var PINS_QANTITY = 5;

  var MIN_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var form = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var addFormElements = form.querySelectorAll('fieldset, select');
  var filtersFormElements = mapFilters.querySelectorAll('fieldset, select');
  var mapPinActive = document.querySelector('.map__pin--main');
  var mapPinAddress = form.querySelector('#address');
  var dataAboutHouses = [];

  window.form = {
    dataAboutHouses: dataAboutHouses,
    PINS_QANTITY: PINS_QANTITY,

    showAddress: function () {
      mapPinAddress.value = parseInt(mapPinActive.style.left, 10) + ', ' + parseInt(mapPinActive.style.top, 10);
    },

    activateForm: function () {
      for (var i = 0; i < filtersFormElements.length; i++) {
        filtersFormElements[i].disabled = false;
      }
    }
  };

  window.form.showAddress();

  mapPinActive.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    window.form.showAddress();

    for (var i = 0; i < addFormElements.length; i++) {
      addFormElements[i].disabled = false;
    }

    if (window.map.similarPinsElement.querySelectorAll('button').length === 1) {
      window.map.similarPinsElement.appendChild(window.pins.createPins(window.form.dataAboutHouses, PINS_QANTITY));
    }

    var successHandlerForPins = function (data) {
      window.form.dataAboutHouses = data;
      window.map.similarPinsElement.appendChild(window.pins.createPins(window.form.dataAboutHouses, PINS_QANTITY));
    };

    if (!window.form.dataAboutHouses.length) {
      window.backend.download(successHandlerForPins, window.error.errorHandler);
    }


  });

  mapPinActive.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startPositin = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      var changePosition = {
        x: startPositin.x - moveEvent.clientX,
        y: startPositin.y - moveEvent.clientY,
      };

      startPositin = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      var coordinateLimits = function () {
        if (mapPinActive.offsetTop - changePosition.y < window.pins.MIN_Y) {
          mapPinActive.style.top = window.pins.MIN_Y + 'px';
        } else if (mapPinActive.offsetTop - changePosition.y > window.pins.MAX_Y) {
          mapPinActive.style.top = window.pins.MAX_Y + 'px';
        }
        mapPinActive.style.top = (mapPinActive.offsetTop - changePosition.y) + 'px';

        if (mapPinActive.offsetLeft - changePosition.x < window.pins.MIN_X) {
          mapPinActive.style.left = window.pins.MIN_X + 'px';
        } else if (mapPinActive.offsetLeft - changePosition.x > window.pins.MAX_X) {
          mapPinActive.style.left = window.pins.MAX_X + 'px';
        }
        mapPinActive.style.left = (mapPinActive.offsetLeft - changePosition.x) + 'px';
      };

      coordinateLimits();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);


  });

  var roomNumber = form.querySelector('#room_number');
  var roomNumberElement = form.querySelectorAll('#room_number > option');
  var roomCapacity = form.querySelectorAll('#capacity > option');

  var changeRoomCapacity = function (index) {
    if (roomNumberElement[index].selected && roomNumberElement[index].value === '1') {
      roomCapacity[0].disabled = true;
      roomCapacity[1].disabled = true;
      roomCapacity[2].disabled = false;
      roomCapacity[3].disabled = true;
      roomCapacity[2].selected = 'true';
    } else if (roomNumberElement[index].selected && roomNumberElement[index].value === '2') {
      roomCapacity[0].disabled = true;
      roomCapacity[1].disabled = false;
      roomCapacity[2].disabled = false;
      roomCapacity[3].disabled = true;
      roomCapacity[2].selected = 'true';
    } else if (roomNumberElement[index].selected && roomNumberElement[index].value === '3') {
      roomCapacity[0].disabled = false;
      roomCapacity[1].disabled = false;
      roomCapacity[2].disabled = false;
      roomCapacity[3].disabled = true;
      roomCapacity[2].selected = 'true';
    } else if (roomNumberElement[index].selected && roomNumberElement[index].value === '100') {
      roomCapacity[0].disabled = true;
      roomCapacity[1].disabled = true;
      roomCapacity[2].disabled = true;
      roomCapacity[3].disabled = false;
      roomCapacity[3].selected = 'true';
    }
  };

  roomNumber.addEventListener('click', function () {
    for (var i = 0; i < roomNumber.length; i++) {
      changeRoomCapacity(i);
    }
  });


  var inputMinPrice = form.querySelector('#price');

  var flatTypeSelect = form.querySelector('#type');
  flatTypeSelect.addEventListener('change', function () {
    var flatType = flatTypeSelect.value;
    inputMinPrice.min = MIN_PRICES[flatType];
    inputMinPrice.placeholder = MIN_PRICES[flatType];
  });

  var timeOfArrival = form.querySelector('#timein');
  var timeOfdeparture = form.querySelector('#timeout');

  timeOfArrival.addEventListener('change', function () {
    timeOfdeparture.value = timeOfArrival.value;
  });

  timeOfdeparture.addEventListener('change', function () {
    timeOfArrival.value = timeOfdeparture.value;
  });

  var resetForm = function () {
    var flatTitle = form.querySelector('#title');
    var flatDescription = form.querySelector('#description');

    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    mapPinActive.style.left = '570px';
    mapPinActive.style.top = '375px';

    mapPinAddress.value = '570, 375';

    for (var n = 0; n < addFormElements.length; n++) {
      addFormElements[n].disabled = true;
    }

    window.pins.removePins();

    window.card.removeCard();

    window.data.removeChild(window.images.imagesContainer);

    window.images.preview.src = 'img/muffin-grey.svg';

    flatTypeSelect[0].selected = true;
    inputMinPrice.value = '';
    inputMinPrice.placeholder = 0;
    flatTitle.value = '';
    timeOfArrival.value = '12:00';
    timeOfdeparture.value = timeOfArrival.value;
    flatDescription.value = '';

    roomCapacity = document.querySelector('#capacity');
    roomNumber.selectedIndex = null;

    var roomCapacityDisabled = function (index) {
      if (roomCapacity[index].value === '1') {
        roomCapacity[index].disabled = false;
        roomCapacity[index].selected = true;
      } else {
        roomCapacity[index].disabled = true;
      }
    };

    for (var i = 0; i < roomCapacity.length; i++) {
      roomCapacityDisabled(i);
    }

    var featuresActive = document.querySelectorAll('.feature__checkbox');
    [].map.call(featuresActive, function (obj) {
      obj.checked = false;
    });
  };


  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), resetForm, window.error.errorHandler);
    evt.preventDefault();
  });

  form.addEventListener('reset', function (evt) {
    resetForm();
    evt.preventDefault();
  });


})();
