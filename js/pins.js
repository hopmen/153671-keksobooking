'use strict';
window.pins = (function () {
  // функция возращает метку с подставленми кординатами и аватаркой из объекта 'data'
  var idPin = 0;
  var getLabel = function (data) {
    var button = document.createElement('button');
    var picture = document.createElement('img');
    button.className = 'map__pin';
    button.setAttribute('id-pin', idPin++);
    button.style.left = data.location.x + 'px';
    button.style.top = data.location.y + 'px';
    button.style.transform = 'translate(-50%, -100%)';
    picture.src = data.author.avatar;
    picture.style.width = '40px';
    picture.style.height = '40px';
    picture.draggable = false;
    button.appendChild(picture);
    return button;
  };


  // функция добавляет все метки из 'arrayLabels' на карту 'mapLabels'
  return {
    getLabels: function (arrayLabels) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arrayLabels.length; i++) {
        fragment.appendChild(getLabel(arrayLabels[i]));
      }
      return fragment;
    }
  };
})();
