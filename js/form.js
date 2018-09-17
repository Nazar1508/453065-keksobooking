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

    window.map.createPins(window.infoList);
    window.similarPinsElement.appendChild(window.fragment);
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

      var coordinateLimits = function () {
        if (mapPinActive.offsetTop - changePosition.y < window.MIN_Y) {
          mapPinActive.style.top = window.MIN_Y + 'px';
        } else if (mapPinActive.offsetTop - changePosition.y > window.MAX_Y) {
          mapPinActive.style.top = window.MAX_Y + 'px';
        }
        mapPinActive.style.top = (mapPinActive.offsetTop - changePosition.y) + 'px';

        if (mapPinActive.offsetLeft - changePosition.x < window.MIN_X) {
          mapPinActive.style.left = window.MIN_X + 'px';
        } else if (mapPinActive.offsetLeft - changePosition.x > window.MAX_X) {
          mapPinActive.style.left = window.MAX_X + 'px';
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

  window.similarPinsElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON') {
      window.map.createCard(window.infoList);
      window.cardElement.classList.remove('hidden');
    } else if (target.tagName === 'IMG') {
      window.map.createCard(window.infoList);
      window.cardElement.classList.remove('hidden');
    }
  });

  window.cardElement.querySelector('.popup__close').addEventListener('click', function () {
    window.cardElement.classList.add('hidden');
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
})();
