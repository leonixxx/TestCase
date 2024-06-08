import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header(props) {
	let linkClassMain = styles.link;
	let linkClassMagaz = styles.link;
	if (props.path == '/') {
		linkClassMain += ` ${styles.link2}`;
	}
	if (props.path == '/magazine') {
		linkClassMagaz += ` ${styles.link2}`;
	}
	return (
		<div className={styles.header}>
			<Link className={linkClassMain} to='/'>
				Главная страница
			</Link>
			<Link className={styles.link} to='/login'>
				Авторизация
			</Link>
			<Link className={linkClassMagaz} to='/magazine'>
				Магазин
			</Link>
		</div>
	);
}
