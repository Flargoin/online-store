import './index.scss';
import Swiper from 'swiper';
import { EffectFade, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { getProductsInfo, getAllCategories } from './modules/getProducts';
import { Product } from './modules/products';
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

let catalogData = [];
let cart = [];

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
const catalogList = document.querySelector('.products-grid');
const inputMin = document.querySelector('[data-price-min]');
const inputMax = document.querySelector('[data-price-max]');
const minmaxPriceBtn = document.querySelector('.filter-price__btn');

const addItemToCart = (e) => {
  const itemObj = {
    id: '',
    name: '',
    brand: '',
    model: '',
    color: '',
    price: '',
    img: '',
    count: '',
    totalPrice: 0,
  };
  const target = e.target;

  if (target.classList.contains('product__btn')) {
    const card = target.closest('.product');
    itemObj.img = card.querySelector('.image-switch__img img').src;
    itemObj.id = card.querySelector('.product__info div:first-child span').textContent.trim();
    itemObj.brand = card.querySelector('.product__info div:nth-of-type(2) span').textContent.trim();
    itemObj.model = card.querySelector('.product__info div:nth-of-type(3) span').textContent.trim();
    itemObj.color = card.querySelector('.product__info div:nth-of-type(4) span').textContent.trim();
    itemObj.price = card.querySelector('.product-price__current span').textContent.trim();
    itemObj.name = card.querySelector('.product__title a').textContent.trim();
    itemObj.count = 1;
  }
  console.log('Объект с данными карточки которую добавляем в корзину', itemObj);
  cart.push(itemObj);
  localStorage.setItem('cart', JSON.stringify(cart));

  counterItemsInCart();
};

const counterItemsInCart = () => {
  try {
    const cartLength = JSON.parse(localStorage.getItem('cart')).length;
    console.log(cartLength);
    if (cartLength > 0) {
      const counter = document.querySelector('.counter');
      counter.classList.add('js-visible');
      counter.textContent = cartLength;
    }
  } catch (e) {}
};

const renderCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const list = document.querySelector('.cart__list');
  const totalBlock = document.querySelector('.cart__total');
  let totalPrice = totalBlock.querySelector('.chars__item:last-child .chars__val');
  let totalItems = totalBlock.querySelector('.chars__item:first-child .chars__val');

  console.log('Элементы расчёта корзины', totalBlock, totalPrice, totalItems);

  totalItems.textContent = cart.length;
  totalPrice.textContent =
    cart.reduce((AllPrice, currentPrice) => AllPrice + +currentPrice.price, 0) + `$`;

  cart.forEach((item) => {
    const { id, name, brand, model, color, price, img, count } = item;

    const card = document.createElement('li');
    card.classList.add('cart__item');
    card.innerHTML = `
        <div class="cart__item-img">
          <img
            src="${img}"
            alt="#"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div class="cart__item-info">
          <h3 class="h3 cart__item-info-title">
            ${name}
          </h3>

          <div class="cart__item-info-price price">
            <div class="price__current"><span>${price}</span>$</div>
            <div class="price__old"><span>350</span>$</div>
          </div>

          <div class="cart__item-info-trigger cart__triggers">
            <button class="cart__triggers-favorite">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                  stroke="#000000"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button class="cart__triggers-delete">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 11V17"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 11V17"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 7H20"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="cart__item-info-stepper cart__stepper stepper">
          <label class="stepper__field">
            <input type="text" value="${+count}" maxlength="3" class="stepper__input" />
            <span class="stepper__tex">pcs</span>
          </label>
          <div class="stepper__btns">
            <button class="stepper__btn stepper__btn--up" aria-label="Plus one">+</button>
            <button class="stepper__btn stepper__btn--down" aria-label="Minus one">
              -
            </button>
          </div>
        </div>
    `;

    list.append(card);
  });
};

let getData = async () => {
  await getProductsInfo.then(
    (data) => (catalogData = data.products.sort((a, b) => a.price - b.price)),
  );
};

if (minmaxPriceBtn) {
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
}

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

if (inputMax && inputMin) {
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
}

if (catalogList) {
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
}

if (catalogList) {
  catalogList.addEventListener('click', (e) => addItemToCart(e));
}

if (document.querySelector('.cart')) {
  renderCart();
}

counterItemsInCart();
