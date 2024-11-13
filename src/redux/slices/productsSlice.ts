import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
}

interface ProductState {
	products: Product[];
	status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductState = {
	products: [],
	status: 'idle',
};
// traer productos
export const getProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		const response = await axios.get<Product[]>(
			'https://fakestoreapi.com/products'
		);
		return response.data;
	}
);
// agregar producto
export const addProduct = createAsyncThunk(
	'products/addProduct',
	async (newProduct: Omit<Product, 'id'>, { getState, dispatch }) => {
		const response = await axios.post<Product>(
			'https://fakestoreapi.com/products',
			newProduct
		);
		return response.data;
	}
);

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addLocalProduct: (state, action: PayloadAction<Product>) => {
			state.products.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.status = 'idle';
				state.products = action.payload;
			})
			.addCase(getProducts.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.products.push(action.payload);
			});
	},
});

export const { addLocalProduct } = productSlice.actions;
export default productSlice.reducer;
