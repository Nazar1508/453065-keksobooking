'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var pinsElement;
  window.data = {
    pinsElement: pinsElement,

    debounce: function (fun, filteredPins) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun(filteredPins);
      }, DEBOUNCE_INTERVAL);
    },

    // Создаем функцию для случайной сортировки елементов масива
    sortElements: function () {
      return 0.5 - Math.random();
    },

    // Создаем функцию для добавления img в DOM
    createPhotos: function (array) {
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
    },

    // Создаем функцию для добавления li в DOM
    createFeatures: function (array) {
      var featuresFragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        var featuresItem = document.createElement('li');
        featuresItem.className = 'popup__feature popup__feature--' + array[i];
        featuresFragment.appendChild(featuresItem);
      }
      return featuresFragment;
    },

    // Создаем функцию для удаления дочерних элементов?
    removeChild: function (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },
  };
})();
