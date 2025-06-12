import { getProductsInfo } from './getProducts';
import { Product } from './products';
import { filterState, filterPrice, inputMax, inputMin } from './filters';

export let catalogData = [];
export const catalogList = document.querySelector('.products-grid');

export const renderCatalog = async () => {
  catalogList.innerHTML = '';
  await getData();
  if (filterState.priceFilter) {
    filterPrice(inputMin.value, inputMax.value);
    filterState.filteredProducts.forEach(async (item) => {
      const card = new Product(item);
      card.render();
    });
  } else if (filterState.categoryFilter) {
    if (filterState.categoryFilter) {
      filterState.filteredProducts.forEach(async (item) => {
        const card = new Product(item);
        card.render();
      });
    }
  } else {
    catalogData.forEach((item) => {
      const card = new Product(item);
      card.render();
    });
  }
};

export let getData = async () => {
  await getProductsInfo.then(
    (data) => (catalogData = data.products.sort((a, b) => a.price - b.price)),
  );
};
