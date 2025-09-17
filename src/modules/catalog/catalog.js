export default class Catalog {
  constructor({ catalogEl, catalogProduct }) {
    this.catalogEl = catalogEl;
    this.catalogProduct = catalogProduct;
  }

  init() {
    const catalog = document.querySelector(this.catalogEl);

    const catalogItem = document.createElement('li');
    catalogItem.classList.add('catalog-item');
    catalog.append(catalogItem);

    const product = document.createElement('article');
    product.classList.add('product');
    catalogItem.append(product);

    product.innerHTML = `
          <div class="product__image">
              <div class="product__switch image-switch">
                  
              </div>
              <ul class="product__image-pagination image-pagination" aria-hidden="true"></ul>
              <button class="product__favorite">
                <svg>
                  <use href="../assets/images/sprite.svg#heart"></use>
                </svg>
              </button>
              </div>

              <div class="product__body">
              <h3 class="h3 product__title">
                  <a href="/product/${this.catalogProduct.id}"
                  >${this.catalogProduct.title}</a
                  >
              </h3>

              <div class="product__info">
                  <div><strong>ID</strong>: 00<span>${this.catalogProduct.id}</span></div>
                  <div><strong>Description</strong>: <span>${this.catalogProduct.description}</span></div>
              </div>

              <div class="product-price">
                  <div class="product-price__current"><span>${this.catalogProduct.price}</span> $</div>
              </div>

              <button class="product__btn">Add to cart</button>
              </div>
      `;
    this.catalogProduct.getImages();
  }
}
