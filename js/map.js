'use strict';


// !WARNING даное решение будет переделана позже в других задания
var mapShow = function () {
  document.querySelector('.map').classList.remove('map--faded');
};
// !WARNING END
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

// возвращает фрагмет созданых из pictures картинок
var getPictures = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    img.setAttribute('src', pictures[i]);
    img.setAttribute('width', 65);
    img.setAttribute('height', 65);
    li.appendChild(img);
    fragment.appendChild(li);
  }
  return fragment;
};
// возвращает фрагмет созданых из features дополнительных услах
var getFeature = function (features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('feature', 'feature--' + features[i]);
    fragment.appendChild(feature);
  }
  return fragment;
};
// возвращает созданую карточку из данных объекта 'data' по шабону template
var getPopup = function (data) {
  var template = document.querySelector('template').content.cloneNode(true);
  template.querySelector('.map__card .popup__avatar').src = data.author.avatar;
  template.querySelector('.map__card h3').textContent = data.offer.title;
  template.querySelector('small').textContent = data.offer.adress;
  template.querySelector('.map__card p').textContent = data.offer.adress;
  template.querySelector('.popup__price').textContent = data.offer.price + '₽ / ночь';
  template.querySelector('.map__card h4').textContent = data.offer.type;
  template.querySelectorAll('.map__card p ')[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  template.querySelectorAll('.map__card p ')[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  template.querySelectorAll('.map__card p ')[4].textContent = data.offer.description;
  template.querySelector('.popup__pictures').appendChild(getPictures(data.offer.photos));
  template.querySelector('.popup__features').appendChild(getFeature(data.offer.features));
  return template;
};
// функция добавляет все метки из 'arrayLabels' на карту 'mapLabels'
var getLabels = function (arrayLabels) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayLabels.length; i++) {
    fragment.appendChild(getLabel(arrayLabels[i]));
  }
  return fragment;
};
var disableFieldsets = function () {
  var fieldsets = document.querySelectorAll('.notice__form fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', true);
  }
  document.querySelector('.notice__form').classList.add('notice__form--disabled');
};

var getPositionMainPins = function () {
  var pins = document.querySelector('.map__pin--main');
  var obj = {
    x: Math.floor(pins.offsetLeft + pins.offsetWidth / 2),
    y: Math.floor(pins.offsetTop + pins.offsetHeight + 22) // 22 - этострелочка вниз под меткой которая сделана через after
  };
  return obj;
};

var activeFieldsets = function () {
  var fieldsets = document.querySelectorAll('.notice__form fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  document.querySelector('.notice__form').classList.remove('notice__form--disabled');
};
var pageActive = function () {
  mapShow();
  activeFieldsets();
  mapLabels.appendChild(getLabels(labels));
  document.querySelector('#address').value = getPositionMainPins().x + ', ' + getPositionMainPins().y;
};

var map = document.querySelector('.map');
var mapLabels = document.querySelector('.map__pins');
var labels = window.getCards();
disableFieldsets();
document.querySelector('#address').value = getPositionMainPins().x + ', ' + getPositionMainPins().y;

var pin = document.querySelector('.map__pin--main');
pin.addEventListener('mouseup', function () {
  pageActive();
  var d = function (evt) {
    if (evt.currentTarget.getAttribute('id-pin') !== null) {
      if (document.querySelector('.map__card') !== null) {
        map.removeChild(document.querySelector('.map__card'));
      }
      var pi = evt.currentTarget.getAttribute('id-pin');
      map.insertBefore(getPopup(labels[pi]), document.querySelector('.map__filters-container'));
    }
  };
  var z = document.querySelectorAll('.map__pin');
  for (var i = 0; i < z.length; i++) {
    z[i].addEventListener('click', d);
  }
});

// начала модуля
// mapShow();
// map.insertBefore(getPopup(labels[0]), document.querySelector('.map__filters-container'));
// mapLabels.appendChild(getLabels(labels));

