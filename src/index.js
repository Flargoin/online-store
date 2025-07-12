import './index.scss';
import { router } from './router';
import { getData } from './modules/services/getData';

import Product from './modules/catalog/product';

window.addEventListener('DOMContentLoaded', async () => {
  /* Рендер каталога START */
  try {
    const data = await getData('https://fakestoreapi.in/api/products');
    // console.log(data);
    for (let i = 0; i < data.products.length; i++) {
      const catalog = new Product(data.products[i]);
      catalog.render();
    }
  } catch (error) {
    console.log('Ошибка получения данных:', error);
  }
  /* Рендер каталога END */
});
