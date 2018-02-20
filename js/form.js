'use strict';

window.form = (function () {
  return {
    // деактивирует тег fieldsets добавляя атрибут disabled
    disableFieldsets: function () {
      var fieldsets = document.querySelectorAll('.notice__form fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].setAttribute('disabled', true);
      }
      document.querySelector('.notice__form').classList.add('notice__form--disabled');
    },
    // активирует тег fieldsets удаляя атрибут disabled
    activeFieldsets: function () {
      var fieldsets = document.querySelectorAll('.notice__form fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].removeAttribute('disabled');
      }
      document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    }
  };
})();
