import './Area.less';

/*import {Tag} from '../Tag/Tag';*/

export class Area {
	private readonly area: HTMLElement;

	constructor() {
		this.area = document.createElement('div');
		this.area.classList.add('body');

		let li = document.createElement('div');
		li.classList.add('first-item');
		li.innerText = 'add more people';
		this.area.append(li);
		
		/*let addEmail = new Tag({
			value: 'Add email',
			btn: {
				width: 98,
				left: 50,
			},
			text: {
				left: 16.33,
				right: 16.33,
			}
		});
		addEmail.addEvent(this.addEmails);
		addEmail.getNode();
		form.append(addEmail.getNode());*/
	}

	public getNode(): HTMLElement {
		return this.area;
	}
}