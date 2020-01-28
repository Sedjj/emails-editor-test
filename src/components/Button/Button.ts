import './Button.less';

interface IClick {
	(this: HTMLElement, ev: HTMLElementEventMap[keyof HTMLElementEventMap]): void;
}

interface IBtn {
	width: number;
	left: number;
}

interface IText {
	left: number;
	right: number;
}

interface IOptions {
	value: string;
	btn: IBtn;
	text: IText;
}

export class Button {
	private static init({value, btn, text}: IOptions): HTMLElement {
		let button = document.createElement('div');
		button.classList.add('btn');
		button.style.width = (btn.width || 0) + 'px';
		button.style.left = (btn.left || 0) + 'px';

		let span = document.createElement('span');
		span.classList.add('text');
		span.style.left = (text.left || 0) + '%';
		span.style.right = (text.right || 0) + '%';
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

	public removeEvent(onClick: IClick): void {
		this.btn.removeEventListener('click', onClick, false);
	}

	public getNode(): HTMLElement {
		return this.btn;
	}
}