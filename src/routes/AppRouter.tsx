import { Routes, Route, HashRouter } from 'react-router-dom';
import Base from '../layouts/Base';
import { Login, NotFound } from '../pages/public/index';
import {
	CreateProduct,
	ProductDetail,
	Products,
	Users,
} from '../pages/private/index';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
	return (
		<HashRouter>
			<Routes>
				<Route
					path='/'
					element={<Base />}
				>
					{/* public routes */}
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>

					{/* private routes */}
					<Route element={<PrivateRoute />}>
						<Route
							path='/products'
							element={<Products />}
						/>
						<Route
							path='/products/:id'
							element={<ProductDetail />}
						/>
						<Route
							path='/products/create'
							element={<CreateProduct />}
						/>
						<Route
							path='/users'
							element={<Users />}
						/>
					</Route>
				</Route>
			</Routes>
		</HashRouter>
	);
};

export default AppRouter;
