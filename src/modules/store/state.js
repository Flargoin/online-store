/* 

Единый источник истины - всё состояние хранится в одном месте

Изменяемость через действия - состояние нельзя изменить напрямую, только через специальные методы

Подписка на изменения - компоненты могут подписываться на изменения состояния

*/

export const createStore = (reducer, initialState) => {
  let state = initialState;
  const listeners = [];

  // Получение текущего состояния.
  const getState = () => state;

  // Отправка действий для обновления состояния.
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  // Подписка на изменения состояния.
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  return { getState, dispatch, subscribe };
};
