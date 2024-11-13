import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

let inactive: NodeJS.Timeout;

const Base: React.FC = () => {
	const dispatch = useDispatch();

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
			clearTimeout(inactive);
			window.removeEventListener('mousemove', timerReset);
			window.removeEventListener('keydown', timerReset);
			window.removeEventListener('click', timerReset);
		};
	}, [dispatch]);

	return (
		<div className='layout'>
			<Header />
			<main className='container'>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Base;
