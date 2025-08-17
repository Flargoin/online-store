export const updateGlobalUI = () => {
  const cartCounter = document.querySelector('.counter');
  const cart = JSON.parse(localStorage.getItem('cart')) ?? [];

    console.log('ui state', cartCounter, cart);

  if (cart.length > 0) {
    cartCounter.classList.add('js-visible');
    cartCounter.textContent = cart.length;
  } else {
    cartCounter.classList.remove('js-visible');
  }
}