/*import remove from '../../assets/remove.svg';*/
import './Tag.less';

export class Tag {
	private readonly tag: HTMLElement;

	constructor(value: string) {
		this.tag = document.createElement('div');
		this.tag.classList.add('tag');

		let input = document.createElement('input');
		input.classList.add('email-input');
		input.innerText = value;
		this.tag.append(input);

		let content = document.createElement('div');
		content.classList.add('email-content');
		content.innerText = value;
		this.tag.append(content);

		let img = document.createElement('span');
		img.innerHTML = 'x';
		this.tag.append(img);

		/*input.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.code == 'Enter' && event.target) {     //&& (event.ctrlKey || event.metaKey)
				this.area.insertBefore(document.createElement('div'), this.area.lastChild);
				props.emit([event.target['value']]);
				event.target['value'] = '';
			}                                 throttle
		}, false);*/

		/*input.addEventListener('change', (event: KeyboardEvent) => {
			const result = document.querySelector('.result');
			result.textContent = `You like ${event.target['value']}`;

			if (event.code == 'Enter' && event.target) {     //&& (event.ctrlKey || event.metaKey)
				props.emit([event.target['value']]);
			}
		}, false);*/

		/*this.area.addEventListener('click', () => {
			input.focus();
		}, false);
		firstItem.append(input);
		this.tag.append(firstItem);*/

	}

	public getNode(): HTMLElement {
		return this.tag;
	}
}