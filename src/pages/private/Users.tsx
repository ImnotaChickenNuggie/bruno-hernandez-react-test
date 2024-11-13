import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateUser } from '../../redux/slices/authSlice';

const Users: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.auth);

	const [email, setEmail] = useState(user?.email || '');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			setError('Por favor, ingresa un correo y una contraseña');
			return;
		}

		try {
			await dispatch(updateUser({ email, password })).unwrap();
			setError('');
			alert('Datos actualizados correctamente');
		} catch (err) {
			setError('Hubo un error al actualizar los datos');
		}
	};

	useEffect(() => {
		if (user) {
			setEmail(user.email);
		}
	}, [user]);

	return (
		<div>
			<h2 className='text-center'>Mi perfil</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}

			<form onSubmit={handleSubmit}>
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
				<button className='buttonLogin' type='submit'>Actualizar</button>
			</form>
		</div>
	);
};

export default Users;
