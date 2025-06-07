import './index.scss';
import Swiper from 'swiper';
import { EffectFade, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { getProductsInfo, getAllCategories } from './modules/getProducts';
import { Product } from './modules/products';
// import { Filters } from './modules/filters';

const thumbs = new Swiper('.slider-nav', {
  direction: 'vertical',
  slidesPerView: 3,
  spaceBetween: 10,
  freeMode: true,
  watchSlidesProgress: true,
});

let catalogData = [];
let catalogCategories = [];

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
const catalogList = document.querySelector('.products-grid');
const inputMin = document.querySelector('[data-price-min]');
const inputMax = document.querySelector('[data-price-max]');
const minmaxPriceBtn = document.querySelector('.filter-price__btn');

let getData = async () => {
  await getProductsInfo.then(
    (data) => (catalogData = data.products.sort((a, b) => a.price - b.price)),
  );
};

minmaxPriceBtn.addEventListener('click', async (e) => {
  e.target.classList.toggle('js-active');
  console.log(e.target.classList.contains('js-active'));
  if (!e.target.classList.contains('js-active')) {
    catalogData.sort((a, b) => a.price + b.price);
  }
  if (e.target.classList.contains('js-active')) {
    catalogData.sort((a, b) => a.price - b.price);
  }

  renderCatalog();
});

const filterState = {
  priceFilter: false,
  priceMaxToMin: false,
  categoryFilter: false,
  stockfilter: false,

  filteredProducts: [],
};

const filterPrice = async (min, max) => {
  filterState.filteredProducts = await catalogData.filter(
    (item) => item.price > min && item.price < max,
  );
};
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

const renderCatalog = async () => {
  catalogList.innerHTML = '';
  await getData();
  if (filterState.priceFilter) {
    filterPrice(inputMin.value, inputMax.value);
    filterState.filteredProducts.forEach(async (item) => {
      const card = new Product(item);
      card.render();
    });
  } else if (filterState.categoryFilter) {
    if (filterState.categoryFilter) {
      filterState.filteredProducts.forEach(async (item) => {
        const card = new Product(item);
        card.render();
      });
    }
  } else {
    catalogData.forEach((item) => {
      const card = new Product(item);
      card.render();
    });
  }
};
renderCatalog();
