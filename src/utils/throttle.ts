/**
 * Функция для задержки выполнения для исключения подвисания интерфейса.
 *
 * @param {Function} func функция которую нужно притормозить
 * @param {Number} ms пауза в миллисекундах
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle(func: any, ms: number): any {
	let timer: NodeJS.Timeout;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let resolves: any[] = [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (...args: any[]) => {
		// Run the function after a certain amount of time
		clearTimeout(timer);
		timer = setTimeout(() => {
			// Get the result of the inner function, then apply it to the resolve function of
			// each promise that has been created since the last time the inner function was run
			const result = func(...args);
			resolves.forEach(r => r(result));
			resolves = [];
		}, ms);

		return new Promise(r => resolves.push(r));
	};
}