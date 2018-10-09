'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var imagesChooser = document.querySelector('#images');

  var preview = document.querySelector('.ad-form-header__preview img');
  var imagesContainer = document.querySelector('.ad-form__photo');

  imagesContainer.style.width = 'auto';
  imagesContainer.style.height = 'auto';
  imagesContainer.style.display = 'flex';
  imagesContainer.style.flexWrap = 'wrap';


  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var imagesHandler = function () {
    var filesNames = [];
    [].forEach.call(imagesChooser.files, function (item) {
      filesNames.push(item.name.toLowerCase());
    });

    for (var i = 0; i < filesNames.length; i++) {
      var isImage = FILE_TYPES.some(function (item) {
        return filesNames[i].endsWith(item);
      });

      if (!isImage) {
        window.error.errorHandler('Только изображения ' + FILE_TYPES);
        break;
      }
    }

    [].forEach.call(imagesChooser.files, function (item) {
      var file = item;
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var imgPreview = document.createElement('img');
        imgPreview.style.height = 70 + 'px';
        imgPreview.style.width = 70 + 'px';
        imgPreview.style.marginRight = 10 + 'px';
        imgPreview.style.marginBottom = 10 + 'px';
        imgPreview.src = reader.result;
        imagesContainer.appendChild(imgPreview);
      });

      reader.readAsDataURL(file);
    });
  };

  var addEventListeners = function () {
    imagesChooser.addEventListener('change', imagesHandler);
  };

  addEventListeners();

  window.images = {
    imagesContainer: imagesContainer,
    preview: preview
  };

})();
