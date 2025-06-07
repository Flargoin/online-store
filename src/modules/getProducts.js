export const getProductsInfo = fetch('https://fakestoreapi.in/api/products').then((res) =>
  res.json(),
);

export const getAllCategories = fetch('https://fakestoreapi.in/api/products/category').then((res) =>
  res.json(),
);
