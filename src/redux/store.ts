import { configureStore } from '@reduxjs/toolkit';
import { encryptData, decryptData } from '../utils/encrypt';
import productReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';

const saveToLocalStorage = (state: any) => {
	localStorage.setItem('reduxState', encryptData(state));
};

const loadFromLocalStorage = () => {
	const encryptedState = localStorage.getItem('reduxState');
	if (!encryptedState) return undefined;
	try {
		const decryptedState = decryptData(encryptedState);

		return {
			auth: decryptedState.auth || {
				isAuthenticated: false,
				user: null,
				status: 'idle',
				error: null,
			},
			products: decryptedState.products || {
				products: [],
				status: 'idle',
			},
		};
	} catch (e) {
		console.log('Error: ' + e);
		return undefined;
	}
};

const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productReducer,
	},
	preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
