'use strict';
(function () {

  var mapFilters = document.querySelector('.map__filters');

  var filteredPins = [];

  var filterData = {
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
      return window.form.housingData;
    } else {
      return window.form.housingData.filter(function (pin) {
        return pin.offer[key] === filters[key];
      });
    }
  };

  var changePrice = function (key, filters) {
    if (filters[key] === 'any') {
      return filteredPins;
    } else {
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
    }
  };

  var changeRoomsAndGuests = function (key, filters) {
    if (filters[key] === 'any') {
      return filteredPins;
    } else {
      return filteredPins.filter(function (pin) {
        return pin.offer[key] === +filters[key];
      });
    }
  };

  var changeFeatures = function (key, filters) {
    if (filters[key] === 'none') {
      return filteredPins;
    } else {
      return filteredPins.filter(function (pin) {
        var keyInPin;
        for (var i = 0; i < pin.offer.features.length; i++) {
          if (pin.offer.features[i] === filters[key]) {
            keyInPin = true;
          }
        }
        return keyInPin;
      });
    }
  };

  var mapFilter = function (target, filters) {
    var filterKey;
    if (target.tagName === 'INPUT') {
      filterKey = target.id.replace('filter-', '');
      if (filters[filterKey] === 'none') {
        filters[filterKey] = filterKey;
      } else {
        filters[filterKey] = 'none';
      }
    } else {
      filterKey = target.id.replace('housing-', '');
      filters[filterKey] = target.value;
    }

    Object.keys(filters).forEach(function (key) {
      if (key === 'type') {
        filteredPins = changeType(key, filters);
      } else if (key === 'price') {
        filteredPins = changePrice(key, filters);
      } else if (key === 'rooms' || key === 'guests') {
        filteredPins = changeRoomsAndGuests(key, filters);
      } else {
        filteredPins = changeFeatures(key, filters);
      }
    });
    return filteredPins;
  };

  var filteringToPins = function (pins) {
    window.card.removeCard();
    window.pins.removePins();
    window.map.similarPinsElement.appendChild(window.pins.createPins(pins, 5));
  };

  mapFilters.addEventListener('change', function (evt) {
    var target = evt.target;
    mapFilter(target, filterData);
    if (target.tagName === 'SELECT' || target.tagName === 'INPUT') {
      window.data.debounce(filteringToPins, filteredPins);
    }
  });
})();
