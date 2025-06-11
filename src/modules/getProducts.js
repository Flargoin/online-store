export const getProductsInfo = fetch('https://fakestoreapi.in/api/products?page=2').then((res) =>
  res.json(),
);

export const getAllCategories = fetch('https://fakestoreapi.in/api/products/category').then((res) =>
  res.json(),
);
