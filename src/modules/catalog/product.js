export default class Product {
  constructor({ image, title, id, brand, model, color, price, discount, description, category }) {
    this.image = image;
    this.title = title;
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.price = price;
    this.discount = discount;
    this.description = description;
    this.category = category;
    this.count = 0;
  }

  addToCart(id) {
    let cart = [];
    try {
      const cartData = localStorage.getItem('cart');
      cart = cartData ? JSON.parse(cartData) : [];
    } catch (e) {
      cart = [];
    }

    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.count++;
    } else {
      cart.push({ id, count: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    this.updateCartCounter();
  }

  updateCartCounter() {
    const counter = document.querySelector('.counter');
    if (counter && +counter.textContent > 0) {
      counter.classList.add('js-visible');
      const totalItems = this.getCartTotalItems();
      counter.textContent = totalItems;
    }
  }

  getCartTotalItems() {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      return cart.reduce((total, item) => total + item.count, 0);
    } catch (error) {
      return 0;
    }
  }

  render() {
    const productCard = document.querySelector('.card');

    productCard.innerHTML = `
    <div class="card__inner">
        <div class="card__top">
          <div class="card-slider">
            <div class="card-slider__nav slider-nav">
              <div class="swiper-wrapper">
                <div class="swiper-slide slider-nav__item">
                  <img
                    src="${this.image}"
                    alt="#"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            <div class="card-slider__block slider-block">
              <div class="swiper-wrapper">
                <div class="swiper-slide slider-block__slide">
                  <img
                    src="${this.image}"
                    alt="#"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
            </div>
        </div>
      </div>
      <div class="card-info">
        <span class="vendor">Article number: <span class="vendor-number">000${this.id}</span></span>
        <h1 class="card__title title">
          ${this.title}
        </h1>

        <div class="price">
          <span class="price__current"><span>${this.price}</span> $</span>
        </div>

        <div class="discount">Discount: <span>${this.discount}</span>%</div>

        <div class="card-info__triggers">
          <button class="btn btn--buy">Add to cart</button>
          <button class="btn btn--favorite">
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="card-bottom">
      <div class="card-features">
        <h3 class="h3 card-features__title">Characteristics:</h3>
        <dl class="chars">
          <div class="chars__item">
            <dt class="chars__term">Category</dt>
            <dd class="chars__val">${this.category}</dd>
          </div>
          <div class="chars__item">
            <dt class="chars__term">Brand</dt>
            <dd class="chars__val">${this.brand}</dd>
          </div>
          <div class="chars__item">
            <dt class="chars__term">Model</dt>
            <dd class="chars__val">${this.model}</dd>
          </div>
          <div class="chars__item">
            <dt class="chars__term">Color</dt>
            <dd class="chars__val">${this.color}</dd>
          </div>
        </dl>
      </div>

      <div class="card-description">
        <h3 class="h3 card-description__title title">Description:</h3>
        <p class="card-description__text">
          ${this.description}
        </p>
      </div>
    </div>
    `;
  }
}
