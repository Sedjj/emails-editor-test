/**
 * Интерфейс конфигурации формы
 */
export interface IEmailsEditor {
	container?: Element | null;
	header?: string;
}

/**
 * Интерфейс emit объекта
 */
export interface ISubscriber {
	name: string;
	emails: string[];
}

export interface IEmit {
	(item: ISubscriber): void;
}

export interface IClick {
	(this: HTMLElement, ev: HTMLElementEventMap[keyof HTMLElementEventMap]): void;
}

/**
 * Объект инициализации кнопки
 */
export interface IOptions {
	value: string;
	indent?: boolean;
}