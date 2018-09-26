'use strict';

(function () {

  var form = document.querySelector('.ad-form');
  var addFormElements = document.querySelectorAll('fieldset, select');
  var mapPinActive = document.querySelector('.map__pin--main');
  form.querySelector('.ad-form__element:nth-child(3) input').value = parseInt(mapPinActive.style.top, 15) + ', ' + parseInt(mapPinActive.style.left, 15);

  mapPinActive.addEventListener('mouseup', function () {
    document.querySelector('.map').classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    form.querySelector('.ad-form__element:nth-child(3) input').value = parseInt(mapPinActive.style.top, 10) + ', ' + parseInt(mapPinActive.style.left, 10);

    for (var i = 0; i < addFormElements.length; i++) {
      addFormElements[i].disabled = false;
    }

    var successHandlerForPins = function (data) {
      window.map.similarPinsElement.appendChild(window.pins.createPins(data));
    };
    window.backend.download(successHandlerForPins, window.error.errorHandler);
  });

  mapPinActive.addEventListener('mousedown', function (evt) {
    var startPositin = {
      x: evt.clientX,
      y: evt.clientY
    };

    window.startPositin = startPositin;

    var onMouseMove = function (moveEvent) {
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

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);


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

  var MIN_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var inputMinPrice = form.querySelector('#price');

  var flatTypeSelect = form.querySelector('#type');
  flatTypeSelect.addEventListener('change', function () {
    var flatType = flatTypeSelect.value;
    inputMinPrice.min = MIN_PRICES[flatType];
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

    document.querySelector('.map').classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    document.querySelector('.map__pin--main').style.left = '570px';
    document.querySelector('.map__pin--main').style.top = '375px';

    for (var n = 0; n < addFormElements.length; n++) {
      addFormElements[n].disabled = true;
    }

    var removePins = function () {
      var mapPin = window.map.similarPinsElement.querySelectorAll('button');
      mapPin.forEach(function (el) {
        if (el.className !== 'map__pin map__pin--main') {
          window.map.similarPinsElement.removeChild(el);
        }
      });
    };

    removePins();

    document.querySelector('.map__card').classList.add('hidden');

    form.querySelector('#type').selected = true;
    form.querySelector('#price').value = '';
    form.querySelector('#price').placeholder = 500;
    form.querySelector('#title').value = '';
    form.querySelector('#timein').value = '12:00';
    form.querySelector('#timeout').value = form.querySelector('#timein').value;
    form.querySelector('#description').value = '';

    roomCapacity = window.form.querySelector('#capacity');
    document.querySelector('#room_number').selectedIndex = null;

    for (var i = 0; i < roomCapacity.length; i++) {
      if (roomCapacity[i].value === '1') {
        roomCapacity[i].disabled = false;
        roomCapacity[i].selected = true;
      } else {
        roomCapacity[i].disabled = true;
      }
    }

    var featuresActive = window.form.querySelectorAll('.feature__checkbox');
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
