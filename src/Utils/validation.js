export function validationEmail(email) {
	const emailRegex = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
	if (emailRegex.test(email)) {
		return true;
	} else {
		return false;
	}
}
export function validationPassword(password) {
	let upper = /^(?=.*[A-Z]).+$/;
	password = password.trim();
	if (password.length < 8) return false;
	if (!upper.test(password)) return false;
	return true;
}
