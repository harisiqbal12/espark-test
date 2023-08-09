import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.slice';
import itemReducer from './reducers/item.slice';

const store = configureStore({
	reducer: {
		user: userReducer,
		item: itemReducer,
	},
});

export default store;
