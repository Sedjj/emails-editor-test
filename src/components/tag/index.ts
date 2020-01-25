import './index.less';

export class Tag {
	private readonly tagName: string;
	private count: number;

	constructor() {
		this.count = 0;
		this.tagName = 'btn';
		//initializations
	}

	public addEvent(btn: HTMLElement): void {
		btn.addEventListener('click', this.onClick, false);
	}

	public removeEvent(btn: HTMLElement): void {
		btn.removeEventListener('click', this.onClick, false);
	}

	private onClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this.count++);
		// eslint-disable-next-line no-console
		console.log(this.tagName);
	};
}