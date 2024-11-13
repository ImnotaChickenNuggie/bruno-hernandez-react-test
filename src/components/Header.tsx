import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import '../styles/header.scss';

const Header: React.FC = () => {
    const dispatch = useDispatch();
	const { authenticated } = useSelector((state: RootState) => state.auth);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header>
			<nav>
				<ul className='navbar'>
					{authenticated ? (
						<>
							<li><Link to="/products">Productos</Link></li>
							<li><Link to="/users">Mi perfil</Link></li>
							<li><button className='buttonLogout' onClick={handleLogout}>Cerrar sesión</button></li>
						</>
					) : (
						<li><Link to="/login">Iniciar sesión</Link></li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
