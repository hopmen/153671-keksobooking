'use strict';
(function () {


// нужные переменые
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var HOTEL_TYPES = ['flat', 'house', 'bungalo'];
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var LABELS_NUMBER = 8;

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
  window.data = {
    getCards: function () {
      var listing = [];// объект который хранит иформацию для метки на карте
      for (var i = 0; i < LABELS_NUMBER; i++) {
        var posX = getRandomInteger(300, 900);
        var posY = getRandomInteger(150, 500);
        listing.push({
          author: {
            avatar: 'img/avatars/user0' + getRandomInteger(1, LABELS_NUMBER) + '.png'
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
    }
  };
})()
;
