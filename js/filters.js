'use strict';
(function () {

  var mapFilters = document.querySelector('.map__filters');

  var filteredPins = [];

  var FILTER_DATA = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    wifi: 'none',
    dishwasher: 'none',
    parking: 'none',
    washer: 'none',
    elevator: 'none',
    conditioner: 'none'
  };

  var PRICES = {
    low: '10000',
    middle: '50000'
  };

  var changeType = function (key, filters) {
    if (filters[key] === 'any') {
      return window.form.dataAboutHouses;
    }
    return window.form.dataAboutHouses.filter(function (pin) {
      return pin.offer[key] === filters[key];
    });

  };

  var changePrice = function (key, filters) {
    if (filters[key] === 'any') {
      return filteredPins;
    }
    return filteredPins.filter(function (pin) {
      var keyInPin;
      if (filters[key] === 'middle') {
        keyInPin = pin.offer[key] >= PRICES.low && pin.offer[key] <= PRICES.middle;
      } else if (filters[key] === 'low') {
        keyInPin = pin.offer[key] < PRICES.low;
      } else if (filters[key] === 'high') {
        keyInPin = pin.offer[key] > PRICES.middle;
      }
      return keyInPin;
    });

  };

  var changeRoomsAndGuests = function (key, filters) {
    if (filters[key] === 'any') {
      return filteredPins;
    }
    return filteredPins.filter(function (pin) {
      return pin.offer[key] === +filters[key];
    });
  };

  var changeFeatures = function (key, filters) {
    if (filters[key] === 'none') {
      return filteredPins;
    }
    return filteredPins.filter(function (pin) {
      var keyInPin;
      var pinValue = function () {
        if (pin.offer.features[i] === filters[key]) {
          keyInPin = true;
        }
      };
      for (var i = 0; i < pin.offer.features.length; i++) {
        pinValue();
        if (keyInPin === true) {
          break;
        }
      }
      return keyInPin;
    });

  };

  var mapFilter = function (target, filters) {
    var filterKey;
    if (target.tagName === 'INPUT') {
      filterKey = target.id.replace('filter-', '');
      if (filters[filterKey] === 'none') {
        filters[filterKey] = filterKey;
      }
      filters[filterKey] = 'none';
    }
    filterKey = target.id.replace('housing-', '');
    filters[filterKey] = target.value;

    Object.keys(filters).forEach(function (key) {
      switch (key) {
        case 'type':
          filteredPins = changeType(key, filters);
          break;
        case 'price':
          filteredPins = changePrice(key, filters);
          break;
        case 'rooms':
        case 'guests':
          filteredPins = changeRoomsAndGuests(key, filters);
          break;
        default:
          filteredPins = changeFeatures(key, filters);
      }
    });
    return filteredPins;
  };

  var filteringToPins = function (pins) {
    window.card.removeCard();
    window.pins.removePins();
    window.map.similarPinsElement.appendChild(window.pins.createPins(pins, window.form.PINS_QANTITY));
  };

  mapFilters.addEventListener('change', function (evt) {
    var target = evt.target;
    mapFilter(target, FILTER_DATA);
    if (target.tagName === 'SELECT' || target.tagName === 'INPUT') {
      window.data.debounce(filteringToPins, filteredPins);
    }
  });
})();
