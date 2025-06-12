 // Функция для загрузки контента страницы (имитация)
 const loadPage = (page) => {
    const content = document.getElementById('content');
    switch(page) {
      case 'home':
        content.textContent = 'Добро пожаловать в наш интернет-магазин!';
        break;
      case 'products':
        content.textContent = 'Список товаров: Товар 1, Товар 2, Товар 3.';
        break;
      case 'cart':
        content.textContent = 'Ваша корзина пуста.';
        break;
      default:
        content.textContent = 'Страница не найдена.';
    }
  }

  // Обработчик клика по ссылкам навигации
  document.querySelector('nav').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault(); // Отменяем переход по ссылке

      const page = e.target.getAttribute('data-page');

      // Загружаем контент страницы
      loadPage(page);

      // Добавляем запись в историю браузера с новым URL и состоянием
      history.pushState({page: page}, '', e.target.getAttribute('href'));
    }
  });

  // Обработка события popstate при навигации назад/вперед
  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    } else {
      // Если state отсутствует, можно загрузить страницу по умолчанию
      loadPage('home');
    }
  });

  // При загрузке страницы загружаем контент в зависимости от URL
  window.addEventListener('DOMContentLoaded', function() {
    // Определяем страницу из URL (например, /products -> products)
    const path = window.location.pathname.replace('/', '') || 'home';
    loadPage(path);

    // Инициализируем состояние истории
    history.replaceState({page: path}, '', window.location.pathname);
  });