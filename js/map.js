'use strict';
// функция возвращает случайное число от min до max
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// функция возвращает массив из случайных элементов 'amountOfData' - колличесто возвращаемых элементов
var getRandomElements = function (arr, amountOfData) {
  var newArr = [];
  if (arr.length >= amountOfData) {
    while (newArr.length < amountOfData) {
      var randomElemen = arr[Math.floor(Math.random() * arr.length)];
      if (newArr.indexOf(randomElemen) < 0) {
        newArr.push(randomElemen);
      }
    }
  } else {
    throw new Error('В массивае ' + arr + 'нет ' + amountOfData + ' элементов');
  }
  return newArr;
};
// функция возвращает случайный тип жилья и переводит на руский язык
var getRandomeTypeHotel = function (arr) {
  var id = getRandomInteger(0, arr.length - 1);
  switch (arr[id]) {
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Бунгало';
  }
  return null;
};
// функция возвращает массив из 'number' эелентов, каждый элемент это объект
var getCards = function (number) {
  var listing = [];// объект который хранит иформацию для метки на карте
  for (var i = 0; i < number; i++) {
    var posX = getRandomInteger(300, 900);
    var posY = getRandomInteger(150, 500);
    listing.push({
      author: {
        avatar: 'img/avatars/user0' + getRandomInteger(1, number) + '.png'
      },
      offer: {
        title: TITLES[getRandomInteger(0, TITLES.length - 1)],
        adress: posX + ', ' + posY,
        price: getRandomInteger(1000, 1000000),
        type: getRandomeTypeHotel(HOTEL_TYPES),
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 5),
        checkin: CHECKIN_TIMES[getRandomInteger(0, CHECKIN_TIMES.length - 1)],
        checkout: CHECKOUT_TIMES[getRandomInteger(0, CHECKOUT_TIMES.length - 1)],
        features: getRandomElements(FEATURES, getRandomInteger(0, FEATURES.length - 1)),
        description: '',
        photos: PHOTOS
      },
      location: {
        x: posX,
        y: posY
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
// функция возращает метку с подставленми кординатами и аватаркой из объекта 'data'
var getLabel = function (data) {
  var button = document.createElement('button');
  var picture = document.createElement('img');
  button.className = 'map__pin';
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
    var img = document.createElement('img');
    img.setAttribute('src', pictures[i]);
    img.setAttribute('width', 65);
    img.setAttribute('height', 65);
    fragment.appendChild(img);
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
  template.querySelector('.map__card p').textContent = data.location.x + ',' + data.location.y;
  template.querySelector('.popup__price').textContent = data.offer.price + '₽ / ночь';
  template.querySelector('.map__card h4').textContent = data.offer.type;
  template.querySelectorAll('.map__card p ')[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  template.querySelectorAll('.map__card p ')[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  template.querySelectorAll('.map__card p ')[4].textContent = data.offer.description;
  template.querySelector('.popup__pictures').appendChild(getPictures(data.offer.photos));
  template.querySelector('.popup__features').innerHTML = '';
  template.querySelector('.popup__features').appendChild(getFeature(data.offer.features));
  return template;
};
// функция добавляет все метки из 'arrayLabels' на карту 'mapLabels'
var addLabelsMap = function (arrayLabels, mapLabels) {
  for (var i = 0; i < arrayLabels.length; i++) {
    mapLabels.appendChild(getLabel(arrayLabels[i]));
  }
};

// нужные переменые
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var HOTEL_TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var NUMBERLABELS = 8;
var map = document.querySelector('.map');
var mapLabels = document.querySelector('.map__pins');
var labels = getCards(NUMBERLABELS);
// начала модуля
mapShow();
map.insertBefore(getPopup(labels[0]), document.querySelector('.map__filters-container'));
addLabelsMap(labels, mapLabels);
