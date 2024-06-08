import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header/Header';
import { LoginContext } from '../context/LoginContext';

export default function Layout() {
	const navigate = useNavigate();
	const { value } = useContext(LoginContext);
	const location = useLocation();
	useEffect(() => {
		if (!value) {
			navigate('/login');
		}
	}, []);

	return (
		<div>
			<Header path={location.pathname} />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
