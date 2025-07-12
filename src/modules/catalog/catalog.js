// import Product from '/product.js';

export default class Catalog {
  constructor({ catalogEl, catalogProduct }) {
    this.catalogEl = catalogEl;
    this.catalogProduct = catalogProduct;
  }

  init() {
    // console.log(this);
    const catalog = document.querySelector(this.catalogEl);

    const catalogItem = document.createElement('li');
    catalogItem.classList.add('catalog-item');
    catalog.append(catalogItem);

    const product = document.createElement('article');
    product.classList.add('product');
    catalogItem.append(product);

    console.log(this.catalogProduct);

    product.innerHTML = `
          <div class="product__image">
              <div class="product__switch image-switch">
                  <div class="image-switch__item">
                  <div class="image-switch__img">
                      <img
                      src="${this.catalogProduct.image}"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      />
                  </div>
                  </div>
              </div>
              <ul class="product__image-pagination image-pagination" aria-hidden="true"></ul>
              <button class="product__favorite">
                  <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                  />
                  </svg>
              </button>
              </div>

              <div class="product__body">
              <h3 class="h3 product__title">
                  <a href="#"
                  >${this.catalogProduct.title}</a
                  >
              </h3>

              <div class="product__info">
                  <div>ID: 00<span>${this.catalogProduct.id}</span></div>
                  <div>Brand: <span>${this.catalogProduct.brand}</span></div>
                  <div>Model: <span>${this.catalogProduct.model}</span></div>
                  <div>Color: <span>${this.catalogProduct.color}</span></div>
              </div>

              <div class="product-price">
                  <div class="product-price__current"><span>${this.catalogProduct.price}</span> $</div>
              </div>

              <button class="product__btn">Add to cart</button>
              </div>
      `;
  }
}
