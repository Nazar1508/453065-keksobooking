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
        onError('Не известный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(openErrorButton());
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  var download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
      window.form.activateForm();
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
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

  successSend.addEventListener('click', closeSuccess);

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

  errorButton.addEventListener('click', closeErrorButton);
})();
