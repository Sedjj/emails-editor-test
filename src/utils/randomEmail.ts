/**
 * Функция для генерации случаного числа в диапозоне от min до max.
 *
 * @param {Number} min начало диапозона
 * @param {Number} max конец диапозона
 */
function randomInteger(min: number, max: number): number {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

/**
 * Функция для генерации случайного email формата [\d|\w]@\w.com
 *
 * @return {String} случано email
 */
export function getEmail(): string {
	const strName: string = '0123456789abcdefghijklmnopqrstuvwxyz';
	const strDomain: string = 'abcdefghijklmnopqrstuvwxyz';
	let strEmail = '';

	for (let i = 0; i < randomInteger(4, 20); i++) {
		strEmail += strName.charAt(Math.round(strName.length * Math.random()));
	}

	strEmail = strEmail + '@';
	for (let j = 0; j < randomInteger(4, 8); j++) {
		strEmail += strDomain.charAt(Math.round(strDomain.length * Math.random()));
	}

	return strEmail + '.com';
}