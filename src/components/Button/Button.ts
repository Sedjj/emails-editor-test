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
	private readonly btn: HTMLElement;

	constructor({value, btn, text}: IOptions) {
		this.btn = document.createElement('div');
		this.btn.classList.add('btn');
		this.btn.style.width = (btn.width || 0) + 'px';
		this.btn.style.left = (btn.left || 0) + 'px';

		let span = document.createElement('span');
		span.classList.add('text');
		span.style.left = (text.left || 0) + '%';
		span.style.right = (text.right || 0) + '%';
		span.innerText = value;

		let background = document.createElement('div');
		background.classList.add('background');

		this.btn.append(background);
		this.btn.append(span);
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