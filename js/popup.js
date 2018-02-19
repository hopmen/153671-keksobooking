'use strict';
(function () {
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
  window.popup = {
    getPopup: function (data) {
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
    }
  };

})()
;
