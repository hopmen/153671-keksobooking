'use strict';

//
var randomInteger = function (min, max) { // функция возвращает случайное число от min до max
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createArray = function (number) { // функция возвращает массив из 'number' эелентов, каждый элемент это объект
  var listing = [];

  for (number; number > 0; number--) {
    listing.push({ // объект который хранит иформацию для метки на карте
      author: {
        avatar: 'img/avatars/user0' + randomInteger(1, number) + '.png'
      },
      offer: {
        title: allTitle[randomInteger(0, allTitle.length - 1)],
        adress: '',
        price: randomInteger(1000, 1000000),
        type: 'house',
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 5),
        checkin: '12:00',
        checkout: '12:00',
        features: allFeatures,
        description: '',
        photos: allPhotos
      },
      location: {
        x: randomInteger(300, 900),
        y: randomInteger(150, 300)
      }
    });
  }
  return listing;
};


// !WARNING даное решение будет переделана позже в других задания
var mapShow = function () {
  document.querySelector('.map').classList.remove('map--faded');
};
// !WARNING END

var createLabels = function (data) { // функция возращает метку с подставленми кординатами и аватаркой из объекта 'data'
  var button = document.createElement('button');
  var picture = document.createElement('img');
  button.className = 'map__pin';
  button.style.left = data.location.x + 'px';
  button.style.top = data.location.y + 'px';
  picture.src = data.author.avatar;
  picture.style.width = '40px';
  picture.style.height = '40px';
  picture.draggable = false;
  button.appendChild(picture);
  return button;
};

var createPopup = function (data, map) { // создает карточку из данных объекта 'data' по шабону template и добавляет на карту 'map' перед фильтором
  var template = document.querySelector('template').content.cloneNode(true);
  template.querySelector('.map__card .popup__avatar').src = data.author.avatar;
  template.querySelector('.map__card h3').textContent = data.offer.title;
  template.querySelector('.map__card p').textContent = data.location.x + ',' + data.location.y;
  template.querySelector('.popup__price').textContent = data.offer.price + '₽ / ночь';
  template.querySelector('.map__card h4').textContent = data.offer.type;
  template.querySelectorAll('.map__card p ')[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  template.querySelectorAll('.map__card p ')[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  template.querySelectorAll('.feature')[randomInteger(0, allFeatures.length - 1)].remove('feature');
  template.querySelectorAll('.map__card p ')[4].textContent = data.offer.description;
  template.querySelector('.popup__pictures img').src = data.offer.photos[1];
  template.querySelector('.popup__pictures img').style.width = '70px';
  map.insertBefore(template, document.querySelector('.map__filters-container'));
};


var addLabelsMap = function (arrayLabels, mapLabels) { // функция добавляет все метки из 'arrayLabels' на карту 'mapLabels'
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayLabels.length; i++) {
    fragment.appendChild(createLabels(arrayLabels[i]));
    mapLabels.appendChild(fragment);
  }
};

// нужные переменые
var allTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var allPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var numberlabels = 8;
var map = document.querySelector('.map');
var mapLabels = document.querySelector('.map__pins');
var arrayLabels = createArray(numberlabels);
// начала модуля
mapShow();
createPopup(arrayLabels[1], map);
addLabelsMap(arrayLabels, mapLabels);
