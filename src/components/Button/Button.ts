import './Button.less';
import {IClick, IOptions} from '../../types/index';

export class Button {
	/**
	 * Метод для инициализации компонета, составление dom структуры.
	 */
	private static init({value, indent}: IOptions): HTMLElement {
		let button: HTMLDivElement = document.createElement('div');
		button.classList.add('btn');
		button.innerText = value;
		if (indent) {
			button.classList.add('indent');
		}
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