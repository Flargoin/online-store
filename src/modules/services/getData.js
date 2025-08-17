export const getData = async (url, errorMessage) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    const content = document.querySelector('.content');
    content.innerHTML = `<div class="error">${errorMessage}</div>`;
    throw error;
  }
};
