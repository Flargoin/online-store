import { getData } from './modules/services/getData';
import { updateGlobalUI } from './modules/utils/ui';
import { store } from './../src/index';
import Catalog from './modules/catalog/catalog';
import Product from './modules/catalog/product';
import Cart from './modules/cart/cart';

let data;
const contentDiv = document.querySelector('.content');

// Загрузка данных для страницы каталога
const loadCatalog = async () => {
  try {
    data = await getData('https://fakestoreapi.in/api/products', 'API is not available');
    const container = document.querySelector('.products-grid');
    container.innerHTML = '';
    for (const item of data.products) {
      const productInstance = new Product(item);
      const catalogInstance = new Catalog({
        catalogEl: '.products-grid',
        catalogProduct: productInstance,
      });
      catalogInstance.init();

      const products = document.querySelectorAll('.product');
      products.forEach((product, i) => {
        if (item.id === i + 1) {
          const btn = product.querySelector('.product__btn');
          btn.addEventListener('click', (e) => {
            productInstance.addToCart(item.id);
          });
        }
      });
    }
  } catch (error) {
    console.error('Ошибка получения данных:', error);
  }
};

// Загрузка данных для страницы товара
const loadProduct = async (id) => {
  let productData;
  let product;

  try {
    if (!data) {
      productData = await getData(
        `https://fakestoreapi.in/api/products/${id}`,
        'API is not available',
      );
      product = new Product(productData.product);
    } else {
      productData = data.products.find((item) => item.id === id);
      product = new Product(productData);
    }

    if (!productData) {
      console.error('Товар не найден');
      return;
    }
    // Здесь рендер товара
    document.title = `Internet Shop | ${product.title}`;

    product.render();
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
  }
};

// Загрузка данных для страницы корзины
const loadCart = async () => {
  data = await getData('https://fakestoreapi.in/api/products', 'API is not available');
  const cart = new Cart(data.products);
  cart.render();
};

// Маршруты
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
    loadData: loadCart,
  },
  404: {
    template: '/templates/404.html',
    title: 'Page not found',
  },
};

// Функция сопоставления пути с маршрутом и извлечения параметров
const matchRoute = (path) => {
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
};

// Навигация по маршруту
const navigateTo = async (path) => {
  const { route, params } = matchRoute(path);

  const html = await fetch(route.template).then((res) => res.text());
  contentDiv.innerHTML = html;
  document.title = `Internet Shop | ${route.title}`;

  history.pushState({ path }, '', path);

  if (route.loadData) {
    await route.loadData(params);
  }

  updateGlobalUI();
  console.log(store.getState());
};

// Функция роутинга и всё что надо во время роута.
export const router = async () => {
  const path = window.location.pathname;
  await navigateTo(path);
  await updateGlobalUI();
};

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
