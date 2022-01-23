import $ from 'jquery';
import 'jquery.inputmask';

window.onload = (event) => {
  $(() => {
    const input = $('.input__text.input__text_with-mask');
    input.inputmask('dd.mm.yyyy', {
      alias: 'date',
      placeholder: 'ДД.ММ.ГГГГ',
      showMaskOnFocus: false,
      showMaskOnHover: false,
    });
  });
};
