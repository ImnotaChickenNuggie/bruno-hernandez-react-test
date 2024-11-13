import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';
import '../../styles/login.scss';

const Login: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await dispatch(login({ email, password })).unwrap();
			navigate('/products');
		} catch (err) {
			setError('Error');
		}
	};
	return (
		<div>
			<h1 className='text-center'>Inicia Sesión</h1>
			<form onSubmit={handleLogin}>
				<div className='input-container'>
					<label>Email</label>
					<input
						className='input-data'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className='input-container'>
					<label>Contraseña</label>
					<input
						className='input-data'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <p>{error}</p>}
				<button className='buttonLogin' type='submit'>Ingresar</button>
			</form>
		</div>
	);
};

export default Login;
