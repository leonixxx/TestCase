// {"ctime":1717852614,"event":"rCylyKXdtzkgbfU"}

export default function WebSocketStr(arr) {
	let result = [];
	arr.map(item => {
		let num = Number(item.match(/\d+/g));
		let revStr = item.split('').reverse().join('').slice(2);
		let actionStr = revStr
			.match(/[A-Z][^:]+/g)[0]
			.trim()
			.slice(0, -1);
		result.push({ date: num, action: actionStr });
	});
	return result;
}
