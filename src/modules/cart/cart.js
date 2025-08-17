export default class Cart {
  constructor(items) {
    this.items = items;
  }

  render() {
    let data = [];
    const cartData = JSON.parse(localStorage.getItem('cart'));
  
    if(cartData) {
      try {
        data = JSON.parse(cartData);

        if (!Array.isArray(data)) {
          data = [];
        }
      } catch(e) {
        console.error(e);
        data = [];
      }
    }

    const cartList = document.querySelector('.cart__list');

    if (data.length === 0) {
      cartList.innerHTML = '<p>Корзина пуста</p>';
      return;
    }

    data.forEach((id) => {
      const card = document.createElement('li');
      card.classList.add('cart__item');

      card.innerHTML = `
         <div class="cart__item-img">
            <img
              src="${this.items[id - 1].image}"
              alt="#"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="cart__item-info">
            <h3 class="h3 cart__item-info-title">
              ${this.items[id - 1].title}
            </h3>

            <div class="cart__item-info-price price">
              <div class="price__current"><span>${this.items[id - 1].price}</span>$</div>
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
              <input type="text" value="${+this.items[id - 1].count}" maxlength="3" class="stepper__input" />
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
      cartList.append(card);
    });
  }
}
