import { catalogData } from './catalog';

export const inputMin = document.querySelector('[data-price-min]');
export const inputMax = document.querySelector('[data-price-max]');

export let filterState = {
  priceFilter: false,
  priceMaxToMin: false,
  categoryFilter: false,
  stockfilter: false,

  filteredProducts: [],
};

export const filterPrice = async (min, max) => {
  filterState.filteredProducts = await catalogData.filter(
    (item) => item.price > min && item.price < max,
  );
};
