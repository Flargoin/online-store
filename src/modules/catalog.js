import { getProductsInfo } from './getProducts';
import { Product } from './products';
import { Cart } from './cart';
import { filterState, filterPrice, inputMax, inputMin } from './filters';

export let catalogData = [];
export let catalogList = document.querySelector('.products-grid');

export let getData = async () => {
  await getProductsInfo.then(
    (data) => (catalogData = data.products.sort((a, b) => a.price - b.price)),
  );
};

export const renderCatalog = async () => {
  console.log(catalogList);
  // catalogList.innerHTML = '';
  await getData();
  if (filterState.priceFilter) {
    await filterPrice(inputMin.value, inputMax.value);
    filterState.filteredProducts.forEach(async (item) => {
      const card = await new Product(item);
      await card.render();
    });
  } else if (filterState.categoryFilter) {
    if (filterState.categoryFilter) {
      filterState.filteredProducts.forEach(async (item) => {
        const card = await new Product(item);
        await card.render();
      });
    }
  } else {
    catalogData.forEach(async (item) => {
      const card = await new Product(item);
      // console.log(card);
      await card.render();
    });
  }
};
