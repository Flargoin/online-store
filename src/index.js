import './index.scss';
import { router } from './router';
import { getData } from './modules/services/getData';

import Catalog from './modules/catalog/catalog';
import Product from './modules/catalog/product';

window.addEventListener('DOMContentLoaded', async () => {
  /* Рендер каталога START */

  try {
    const data = await getData('https://fakestoreapi.in/api/products');
    for (let i = 0; i < data.products.length; i++) {
      const catalogProducts = await new Catalog({
        catalogEl: '.products-grid',
        catalogProduct: await new Product(data.products[i]),
      });
      catalogProducts.init();
    }
  } catch (error) {
    console.log('Ошибка получения данных:', error);
  }
  /* Рендер каталога END */
});
