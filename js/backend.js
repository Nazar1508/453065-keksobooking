'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';

  var successSend = document.querySelector('.success');
  var error = document.querySelector('.error');
  var errorButton = document.querySelector('.error__button');

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        openSuccess();
        onLoad(xhr.response);
      } else {
        onError();
      }

      if (xhr.status === 500) {
        onError(openErrorButton());
      }
    });

    xhr.addEventListener('error', function () {
      var unknownStatusErrorMessage = 'Не известный статус: ' + xhr.status + ' ' + xhr.statusText;
      onError(unknownStatusErrorMessage);
    });

    xhr.addEventListener('timeout', function () {
      var timeoutErrorMessage = 'Запрос не успел выполниться за ' + xhr.timeout + 'мс';
      onError(timeoutErrorMessage);
    });

    xhr.timeout = 10000;
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  var download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var connectionsErrorMessage = 'Произошла ошибка соединения';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
      window.form.activateForm();
    });

    xhr.addEventListener('error', function () {
      onError(connectionsErrorMessage);
    });

    xhr.timeout = 10000;
    xhr.open('GET', GET_URL);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    download: download,
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.map.ESC_KEYCODE) {
      closeSuccess();
    }
  };

  var openSuccess = function () {
    successSend.classList.remove('hidden');
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var closeSuccess = function () {
    successSend.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  successSend.addEventListener('click', function () {
    closeSuccess();
  });

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.map.ESC_KEYCODE) {
      closeErrorButton();
    }
  };

  var openErrorButton = function () {
    error.classList.remove('hidden');
    document.addEventListener('keydown', onErrorEscPress);
  };

  var closeErrorButton = function () {
    error.classList.add('hidden');
    document.removeEventListener('keydown', onErrorEscPress);
  };

  errorButton.addEventListener('click', function () {
    closeErrorButton();
  });

  error.addEventListener('click', function () {
    closeErrorButton();
  });

})();
