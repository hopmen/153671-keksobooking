'use strict';

var pageStatus = false;
// функция возращает положение main--pin
var getPositionMainPin = function () {
  var pins = document.querySelector('.map__pin--main');
  var obj = {
    x: Math.floor(pins.offsetLeft + pins.offsetWidth / 2),
    y: Math.floor(pins.offsetTop + pins.offsetHeight + 22) // 22 - этострелочка вниз под меткой которая сделана через after
  };
  return obj;
};

// функция переводит страницу в активное состаяние
var pageActive = function () {
  pageStatus = true;
  document.querySelector('.map').classList.remove('map--faded');
  window.form.activeFieldsets();
  mapLabels.appendChild(window.pins.getLabels(labels));


  var addPopup = function (element) {
    deletePopup();
    var idPin = element.getAttribute('id-pin');
    map.insertBefore(window.popup.getPopup(labels[idPin]), document.querySelector('.map__filters-container'));
  };
  mapLabels.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'IMG') {
      if (!evt.target.parentElement.classList.contains('map__pin--main')) {
        addPopup(evt.target.parentElement);
      }

    }
    if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
      addPopup(evt.target);
    }
  });

};
// функция переводит страницу в не активное состаяние
var pageInactive = function () {
  window.form.disableFieldsets();
  document.querySelector('#address').value = getPositionMainPin().x + ', ' + getPositionMainPin().y;
};

var map = document.querySelector('.map');
var mapLabels = document.querySelector('.map__pins');
var labels = window.data.getCards();
var pin = document.querySelector('.map__pin--main');
pageInactive();
var deletePopup = function () {
  if (document.querySelector('.map__card') !== null) {
    map.removeChild(document.querySelector('.map__card'));
  }
};
pin.addEventListener('mouseup', function () {
  if (!pageStatus) {
    pageActive();
  }
});


