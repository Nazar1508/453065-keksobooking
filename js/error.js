'use strict';

(function () {
  window.error = {
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style.zIndex = '100';
      node.style.margin = '0 auto';
      node.style.textAlign = 'center';
      node.style.backgroundColor = 'red';
      node.style.position = 'fixed';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '20px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
