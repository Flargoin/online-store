import './index.scss';
import Swiper from 'swiper';
import { EffectFade, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const thumbs = new Swiper('.slider-nav', {
  direction: 'vertical',
  slidesPerView: 3,
  spaceBetween: 10,
  freeMode: true,
  watchSlidesProgress: true,
});

new Swiper('.slider-block', {
  direction: 'vertical',
  slidesPerView: 'auto',
  modules: [EffectFade, Thumbs],
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  grabCursor: true,
  loop: true,
  thumbs: {
    swiper: thumbs,
  },
});

// import { checkOnlyNumbers } from './modules/helpers';
// import product from './modules/product';
// import tabs from './modules/tabs';

// tabs();
// product();

// const inputs = document.querySelectorAll('.filters-price__input');

// inputs.forEach((item) => {
//   checkOnlyNumbers(item);
// });
