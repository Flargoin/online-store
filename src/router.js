import { getData } from './modules/services/getData';
import Catalog from './modules/catalog/catalog';
import Product from './modules/catalog/product';

let data;

const loadCatalog = async () => {
  try {
    data = await getData('https://fakestoreapi.in/api/products');
    console.log(data);
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
};

// Загрузка товара по id и рендер
const loadProduct = async (id) => {
  console.log(id);
  try {
    if (!data) {
      await loadCatalog(); // если каталога нет, загрузить
    }
    const productData = data.products.find((p) => p.id === id);
    if (!productData) {
      console.error('Товар не найден');
      // Можно показать 404 или сообщение
      return;
    }
    // Здесь рендер товара
    const product = new Product(data.products[id - 1]);
    document.title = `Internet Shop | ${product.title}`;
    product.render();
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
  }
};

const routes = {
  '/': {
    template: '/templates/products.html',
    title: 'Catalog',
    loadData: loadCatalog,
  },
  '/product/:id': {
    template: '/templates/product.html',
    title: 'Product',
    loadData: async (params) => {
      await loadProduct(Number(params.id));
    },
  },
  '/favorites': {
    template: '/templates/favorites.html',
    title: 'Favorites',
  },
  '/cart': {
    template: '/templates/cart.html',
    title: 'Cart',
  },
  404: {
    template: '/templates/404.html',
    title: 'Page not found',
  },
};

// Функция сопоставления пути с маршрутом и извлечения параметров
function matchRoute(path) {
  for (const routePath in routes) {
    const routeParts = routePath.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (routeParts.length !== pathParts.length) continue;

    let params = {};
    let matched = true;

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return { route: routes[routePath], params };
    }
  }
  return { route: routes[404], params: {} };
}

const contentDiv = document.querySelector('.content');

// Навигация по маршруту
async function navigateTo(path) {
  const { route, params } = matchRoute(path);

  const html = await fetch(route.template).then((res) => res.text());
  contentDiv.innerHTML = html;
  document.title = `Internet Shop | ${route.title}`;

  history.pushState({ path }, '', path);

  if (route.loadData) {
    await route.loadData(params);
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
