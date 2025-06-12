import './index.scss';
import Swiper from 'swiper';
import { EffectFade, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {  }
import { addItemToCart, counterItemsInCart, renderCart, cart } from './modules/cart';
import { catalogList, renderCatalog, getData } from './modules/catalog';

import { filterPrice, filterState, inputMax, inputMin } from './modules/filters';
// import { Filters } from './modules/filters';

const thumbs = new Swiper('.slider-nav', {
  breakpoints: {
    320: {
      slidesPerView: 2,
      direction: 'horizontal',
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      direction: 'vertical',
      loop: true,
      freeMode: true,
      // watchSlidesProgress: true,
      spaceBetween: 10,
      slidesPerView: 3,
    },
  },
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
  breakpoints: {
    320: {
      direction: 'horizontal',
    },
    1024: {
      direction: 'vertical',
    },
  },
});

if (document.querySelector('.cart')) {
  renderCart();
}

inputMin.addEventListener('input', async () => {
  console.log('min change');
  filterState.priceFilter = true;
  const min = inputMin.value;
  const max = inputMax.value;
  await filterPrice(min, max);
  renderCatalog();
});

inputMax.addEventListener('input', async () => {
  console.log('max change');
  filterState.priceFilter = true;
  const min = inputMin.value;
  const max = inputMax.value;
  await filterPrice(min, max);
  renderCatalog();
});

renderCatalog();
catalogList.addEventListener('click', (e) => addItemToCart(e));

counterItemsInCart();
