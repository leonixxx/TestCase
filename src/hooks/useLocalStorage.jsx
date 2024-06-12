import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		const item = window.localStorage.getItem(key);
		return item !== 'undefined' ? JSON.parse(item) : initialValue;
	});

	useEffect(() => {
		const item = JSON.stringify(value);
		window.localStorage.setItem(key, item);
	}, [key, value]);

	return [value, setValue];
}
