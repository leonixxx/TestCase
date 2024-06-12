import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Components/Header/Header';
import { LoginContext } from '../context/LoginContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Layout() {
	const navigate = useNavigate();
	const value = useContext(LoginContext);
	const [storeValue] = useLocalStorage('isLogin');

	useEffect(() => {
		if (storeValue) {
			value.setValue();
		}
		if (!value.value) {
			navigate('/login');
		}
	});

	return (
		<div>
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
