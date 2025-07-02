const routes = {
  '/': {
    template: '/templates/products.html',
    title: 'Catalog | Internet-Shop',
  },
  '/product': {
    template: '/templates/product.html',
    title: 'Product page | Internet-Shop',
  },
  '/cart': {
    template: '/templates/cart.html',
    title: 'Cart | Internet-Shop',
  },
  404: {
    template: '/templates/404.html',
    title: 'Page not found | Internet-Shop',
  },
};

const contentDiv = document.querySelector('.content');

// Обработка навигации
async function navigateTo(path) {
  const route = (await routes[path]) || (await routes[404]);

  // Загрузка шаблона
  const html = await fetch(route.template).then((res) => res.text());
  contentDiv.innerHTML = await html;
  document.title = await route.title;

  // Сохранение в истории
  history.pushState({ path }, '', path);
}

// Перехват кликов по ссылкам
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    navigateTo(e.target.getAttribute('href'));
  }
});

// Обработка кнопок назад/вперед
window.addEventListener('popstate', (e) => {
  if (e.state?.path) {
    navigateTo(e.state.path);
  }
});

// Инициализация
window.addEventListener('DOMContentLoaded', async () => {
  await navigateTo(window.location.pathname);
});
