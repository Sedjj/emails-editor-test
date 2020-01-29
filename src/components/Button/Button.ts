import './Button.less';

interface IClick {
	(this: HTMLElement, ev: HTMLElementEventMap[keyof HTMLElementEventMap]): void;
}

interface IOptions {
	value: string;
	indent?: boolean;
}

export class Button {
	private static init({value, indent}: IOptions): HTMLElement {
		let button = document.createElement('div');
		button.classList.add('btn');
		if (indent) {
			button.classList.add('indent');
		}

		let span = document.createElement('span');
		span.classList.add('text');
		span.innerText = value;

		let background = document.createElement('div');
		background.classList.add('background');

		button.append(background);
		button.append(span);
		return button;
	}

	private readonly btn: HTMLElement;

	constructor(props: IOptions) {
		this.btn = Button.init(props);
	}

	public addEvent(onClick: IClick): void {
		this.btn.addEventListener('click', onClick, false);
	}

	/**
	 * Метод для получения текущего узла элемента
	 */
	public getNode(): HTMLElement {
		return this.btn;
	}
}