import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PrivateRoute = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => !!state.auth.user
	);
	return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
