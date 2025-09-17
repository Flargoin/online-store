export default class Cart {
  constructor(items) {
    this.items = items;
  }

  render() {
    let data = [];
    const cartData = JSON.parse(localStorage.getItem('cart'));

    if (cartData) {
      try {
        data = JSON.parse(cartData);

        if (!Array.isArray(data)) {
          data = [];
        }
      } catch (e) {
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
                <svg>
                  <use href="../assets/images/sprite.svg#heart"></use>
                </svg>
              </button>
              <button class="cart__triggers-delete">
                <svg>
                  <use href="../assets/images/sprite.svg#delete"></use>
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
