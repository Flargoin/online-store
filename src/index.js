import './index.scss';
import { createStore } from './modules/store/state';
import { userReducer } from './modules/store/reducer';
import { router } from './router';

export const store = createStore(userReducer, {
  users: [],
  loading: false,
  error: null,
});

window.addEventListener('DOMContentLoaded', async () => {
  router();
});
