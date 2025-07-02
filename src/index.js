import './index.scss';
import { router } from './router';
import Swiper from 'swiper';
import { EffectFade, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
// import { addItemToCart, counterItemsInCart, renderCart, cart } from './modules/cart';
import { Cart } from './modules/cart';
import { catalogList, renderCatalog, getData } from './modules/catalog';
// import { filterPrice, filterState, inputMax, inputMin } from './modules/filters';

window.addEventListener('DOMContentLoaded', (e) => {
  setTimeout(() => {
    const cart = new Cart(0);
    cart.getCount();
    cart.addItemToCart();
  }, 1000);
});

// const thumbs = new Swiper('.slider-nav', {
//   breakpoints: {
//     320: {
//       slidesPerView: 2,
//       direction: 'horizontal',
//       spaceBetween: 10,
//     },
//     768: {
//       slidesPerView: 3,
//       spaceBetween: 10,
//     },
//     1024: {
//       direction: 'vertical',
//       loop: true,
//       freeMode: true,
//       // watchSlidesProgress: true,
//       spaceBetween: 10,
//       slidesPerView: 3,
//     },
//   },
// });

// new Swiper('.slider-block', {
//   direction: 'vertical',
//   slidesPerView: 'auto',
//   modules: [EffectFade, Thumbs],
//   effect: 'fade',
//   fadeEffect: {
//     crossFade: true,
//   },
//   grabCursor: true,
//   loop: true,
//   thumbs: {
//     swiper: thumbs,
//   },
//   breakpoints: {
//     320: {
//       direction: 'horizontal',
//     },
//     1024: {
//       direction: 'vertical',
//     },
//   },
// });

// if (document.querySelector('.cart')) {
//   renderCart();
// }

renderCatalog();

// catalogList.addEventListener('click', async (e) => await addItemToCart(e));
// counterItemsInCart();
