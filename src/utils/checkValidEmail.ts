/**
 * Функция для генерации случаного числа в диапозоне от min до max.
 *
 * @param {String} text строка для проверки
 */
export function validEmail(text: string): boolean {
	return !!text.match(/\S+@\S+\.\S+/);
}