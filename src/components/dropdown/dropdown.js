async function initDropDown() {

  try {
    const {
      default: jQuery
    } = await import('jquery');
    const $ = jQuery.noConflict();
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
    ].map((item) => item.on('click', dropdownShowHide));
    return 0;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
const ready = async () => {
  try {
    document.addEventListener('DOMContentLoaded', () => {
      console.info('DOM loaded');
    });
    return true;
  } catch (e) {
    throw new Error(`DOM not loaded: ${e}`);
  }
};
ready().then(() => {
  initDropDown();
});

export {
  initDropDown
};