export default () => {
    const products = document.querySelectorAll('.product');

    if(products) {
        products.forEach(el => {
            const currentEl = el;

            const imageSwitchItems = el.querySelectorAll('.image-switch__item');
            const imagePagination = el.querySelector('.image-pagination');

            if(imageSwitchItems.length > 1) {
                imageSwitchItems.forEach((item, i) => {
                    item.setAttribute('data-index', i);
                    imagePagination.innerHTML += `
                    <li class="image-pagination__item ${i === 0 ? 'image-pagination__item--active' : ''}" data-index="${i}"></li>
                    `

                    item.addEventListener('mouseenter', (e) => {
                        currentEl.querySelector(`.image-pagination__item--active`).classList.remove('image-pagination__item--active');
                        currentEl.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination__item--active');
                    })

                    item.addEventListener('mouseleave', (e) => {
                        currentEl.querySelector(`.image-pagination__item--active`).classList.remove('image-pagination__item--active');
                        currentEl.querySelector(`.image-pagination__item[data-index="0"]`).classList.add('image-pagination__item--active');
                    })
                })
            }
        });
    }
}