import {Tag} from '../Tag/Tag';
import './Area.less';

interface IEmit {
	(item: string[]): void;
}

interface IProps {
	emit: IEmit;
}

export class Area {
	private readonly area: HTMLElement;

	constructor(props: IProps) {
		this.area = document.createElement('div');
		this.area.classList.add('container');

		let input = document.createElement('input');
		input.classList.add('item-input');
		input.placeholder = 'add more people';

		let firstItem = document.createElement('div');
		firstItem.classList.add('item', 'first');

		input.addEventListener('keydown', this.handleKeydown.bind(this, props), false);

		/*input.addEventListener('change', (event: KeyboardEvent) => {
			const result = document.querySelector('.result');
			result.textContent = `You like ${event.target['value']}`;

			if (event.code == 'Enter' && event.target) {     //&& (event.ctrlKey || event.metaKey)
				props.emit([event.target['value']]);
			}
		}, false);*/

		this.area.addEventListener('click', () => {
			input.focus();
		}, false);
		firstItem.append(input);
		this.area.append(firstItem);
	}

	private handleKeydown(props: IProps, event: KeyboardEvent): void {
		if ((event.code == 'Enter' || event.code == 'NumpadEnter') && event.target) {     //&& (event.ctrlKey || event.metaKey)
			const newTag = event.target['value'];
			props.emit([newTag]);
			this.newTags(newTag);
			event.target['value'] = '';
		}
	}

	private newTags(value?: string): void {
		if (value != null) {
			let emails: string[] = value.replace(/\s/g, '').split(',');
			emails.forEach(item => {
				let tag = new Tag(item);
				this.area.insertBefore(tag.getNode(), this.area.lastChild);
			});
		}
	}

	public getNode(): HTMLElement {
		return this.area;
	}
}