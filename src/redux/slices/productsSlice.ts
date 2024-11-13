import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}

interface ProductState {
	products: Product[];
	productDetail: Product | null;
	status: 'idle' | 'loading' | 'failed';
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	productDetail: null,
	status: 'idle',
	loading: false,
	error: null,
};
// traer productos
export const getProducts = createAsyncThunk(
	'products/getProducts',
	async () => {
		const response = await axios.get<Product[]>(
			'https://fakestoreapi.com/products'
		);
		return response.data;
	}
);
// traer data de un producto
export const getProductById = createAsyncThunk(
	'products/getProductById',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://fakestoreapi.com/products/${id}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue('Error: ' + error);
		}
	}
);
// agregar producto
export const addProduct = createAsyncThunk(
	'products/addProduct',
	async (newProduct: Omit<Product, 'id'>, { dispatch }) => {
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
		clearProducts: (state) => {
			state.products = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.status = 'idle';
				const existingIds = state.products.map((p) => p.id);
				const newProducts = action.payload.filter(
					(product) => !existingIds.includes(product.id)
				);
				state.products = [...state.products, ...newProducts];
			})
			.addCase(getProducts.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(getProductById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.productDetail = action.payload;
			})
			.addCase(getProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				const updatedProduct = action.payload;
				const index = state.products.findIndex(
					(product) => product.title === updatedProduct.title
				);
				if (index !== -1) {
					state.products[index] = updatedProduct;
				}
				console.log('Producto agregado:', action.payload);
			});
	},
});

export const { addLocalProduct, clearProducts } = productSlice.actions;
export default productSlice.reducer;
