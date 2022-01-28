import $ from 'jquery';
import { setLogLevel } from 'webpack-dev-server/client/utils/log';

setLogLevel('verbose');

function initDropDown() {
  const dropdown = $('.dropdown');
  const arrowBtn = dropdown.find('.dropdown__button');
  const dropItems = dropdown.find('.dropdown__dropitems');
  const box = dropdown.find('.dropdown__input');
  const dropdownShowHide = (event) => {
    event.preventDefault();
    dropItems.toggleClass('dropdown__dropitems_closed');
    arrowBtn.toggleClass('dropdown__button_opened');
    box.toggleClass('dropdown__input_opened');
  };

  [
    box,
    arrowBtn,
  ].map((item) => item.bind('click', item.event, dropdownShowHide));
  return 0;
}

window.load = initDropDown();
