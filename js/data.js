'use strict';

(function () {
  window.data = {

    // Создаем функцию для создания случайных чисел
    randomInteger: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },

    // Создаем функцию для возврата случайного свойства из объекта
    randomProperty: function (obj) {
      var keys = Object.keys(obj);
      return obj[keys [keys.length * Math.random() << 0]];
    },

    // Создаем функцию, которая будет возвращать случайную количество элементов из массива
    getRandomELements: function (array) {
      var randomElements = array.slice(0, window.data.randomInteger(1, array.length));
      return randomElements;
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
    }
  };
})();
