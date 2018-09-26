'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var successSend = document.querySelector('.success');

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successSend.classList.remove('hidden');
        onLoad(xhr.response);
      } else {
        onError('Не известный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединеия');
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

  successSend.addEventListener('click', function () {
    successSend.classList.add('hidden');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        successSend.classList.add('hidden');
      }
    });
  });

})();
