import { getData } from './modules/services/getData';
import Catalog from './modules/catalog/catalog';
import Product from './modules/catalog/product';

const routes = {
  '/': {
    template: '/templates/products.html',
    title: 'Catalog | Internet-Shop',
    loadData: async () => {
      try {
        const data = await getData('https://fakestoreapi.in/api/products');
        const container = document.querySelector('.products-grid');
        container.innerHTML = ''; // очистить перед рендером

        for (const item of data.products) {
          const productInstance = new Product(item);
          const catalogInstance = new Catalog({
            catalogEl: '.products-grid',
            catalogProduct: productInstance,
          });
          catalogInstance.init();
        }
      } catch (error) {
        console.error('Ошибка получения данных:', error);
      }
    },
  },
  '/product': {
    template: '/templates/product.html',
    title: 'Product page | Internet-Shop',
  },
  '/favorites': {
    template: '/templates/favorites.html',
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

  // Загрузка данных для шаблона
  if (route.loadData) {
    await route.loadData();
  }
}

export async function router() {
  const path = window.location.pathname;
  await navigateTo(path);
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
