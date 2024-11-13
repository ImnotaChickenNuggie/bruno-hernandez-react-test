import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { encryptData, decryptData } from '../../utils/encrypt';

interface AuthState {
	authenticated: boolean;
	user: { email: string } | null;
	status: 'idle' | 'loading' | 'failed';
	error: string | null;
}

const initialState: AuthState = {
	authenticated: false,
	user: null,
	status: 'idle',
	error: null,
};

export const login = createAsyncThunk(
	'auth/login',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const token = encryptData(email + password);

			Cookies.set('user', encryptData(JSON.stringify({ email })), {
				expires: 1,
			});
			Cookies.set('token', token, { expires: 1 });

			return { email };
		} catch (error) {
			return rejectWithValue('Error al iniciar sesión');
		}
	}
);

export const updateUser = createAsyncThunk(
	'auth/updateUser',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const updatedUser = { email };
			Cookies.set('user', encryptData(JSON.stringify(updatedUser)), {
				expires: 1,
			});

			return { email };
		} catch (error) {
			return rejectWithValue('Error');
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			Cookies.remove('user');
			Cookies.remove('token');
			state.authenticated = false;
			state.user = null;
		},
		loadUser: (state) => {
			const storedUser = Cookies.get('user');
			if (storedUser) {
				state.user = JSON.parse(decryptData(storedUser));
				state.authenticated = true;
			}
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(
				login.fulfilled,
				(state, action: PayloadAction<{ email: string }>) => {
					state.status = 'idle';
					state.authenticated = true;
					state.user = { email: action.payload.email };
				}
			)
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
		builder
			.addCase(updateUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(
				updateUser.fulfilled,
				(state, action: PayloadAction<{ email: string }>) => {
					state.status = 'idle';
					state.user = { email: action.payload.email };
				}
			)
			.addCase(updateUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	},
});

export const { logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
