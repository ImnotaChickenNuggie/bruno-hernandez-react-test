import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';

const Login: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	let inactive: NodeJS.Timeout;

	const timerReset = () => {
		clearTimeout(inactive);
		inactive = setTimeout(() => {
			dispatch(logout());
		}, 5 * 60 * 1000);
	};

	useEffect(() => {
		timerReset();
		window.addEventListener('mousemove', timerReset);
		window.addEventListener('keydown', timerReset);
		window.addEventListener('click', timerReset);

		return () => {
			// Limpiar temporizador y eventos al desmontar
			clearTimeout(inactive);
			window.removeEventListener('mousemove', timerReset);
			window.removeEventListener('keydown', timerReset);
			window.removeEventListener('click', timerReset);
		};
	}, [dispatch]);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await dispatch(login({ email, password })).unwrap();
		} catch (err) {
			setError('Error');
		}
	};
	return (
		<div>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Contraseña</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <p>{error}</p>}
				<button type='submit'>Ingresar</button>
			</form>
			<button onClick={() => dispatch(logout())}>Cerrar sesion</button>
		</div>
	);
};

export default Login;
