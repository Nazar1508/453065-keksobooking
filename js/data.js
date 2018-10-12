'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var featuresFragment;
  var photosFragment;

  // Создаем функцию для добавления img в DOM
  var renderPhotoItem = function (element) {
    var photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.src = element;
    photo.width = '45';
    photo.height = '40';
    photo.alt = 'Фотография жилья';
    photosFragment.appendChild(photo);
  };

  window.data = {
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

    pinRender: function (element, i) {
      var pinsElement = window.pins.similarPinsTemplate.cloneNode(true);
      pinsElement.style = 'left: ' + parseInt(element.location.x, 10) + 'px; top: ' + parseInt(element.location.y, 10) + 'px';
      pinsElement.querySelector('img').src = element.author.avatar;
      pinsElement.id = i;
      pinsElement.alt = 'Метка объявления';

      window.data.fragment.appendChild(pinsElement);
    },


    createPhotos: function (array) {
      photosFragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        renderPhotoItem(array[i]);
      }
      return photosFragment;
    },

    // Создаем функцию для добавления li в DOM
    renderFeaturesItem: function (element) {
      var featuresItem = document.createElement('li');
      featuresItem.className = 'popup__feature popup__feature--' + element;
      featuresFragment.appendChild(featuresItem);
    },

    createFeatures: function (array) {
      featuresFragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        window.data.renderFeaturesItem(array[i]);
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
