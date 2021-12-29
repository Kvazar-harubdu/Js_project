
import tabs from './moduls/tabs';
import timer from './moduls/timer';
import slider from './moduls/slider';
import modalWindow from './moduls/modalWindow';
import forms from './moduls/forms';
import cards from './moduls/cards';
import calculate from './moduls/calculate';
import {openModal} from './moduls/modalWindow';
window.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', '.tabheader__item_active');
  timer('.timer', '2022-01-01');
  modalWindow('[data-modal]', '.modal', modalTimerId);
  forms('form', modalTimerId);
  cards();
  calculate();
  slider({
    containerSlider: '.offer__slider',
    sliderSelrct: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    carentCaunter: '#current',
    wrapperSlider: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
});