import { createContext } from 'react';

export const LoginContext = createContext({
	value: false,
	setValue() {
		this.value = true;
	},
});
