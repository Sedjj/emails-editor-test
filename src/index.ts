import {Area} from './components/Area/Area';
import {Button} from './components/Button/Button';
import './index.less';
import {getEmail} from './utils/randomEmail';

interface IEmailsEditor {
	container?: Element | null;
	header?: string;
	width?: number;
	height?: number;
}

interface ISubscriber {
	name: string;
	emails: string[];
}

interface IEmit {
	(item: ISubscriber): void;
}

export class EmailsEditor {
	// private readonly container: Element | null = null;
	private emit: IEmit | null = null;
	private emails: string[] = [];

	constructor(props: IEmailsEditor) {
		if (props.container) {
			let form = document.createElement('div');
			form.classList.add('frame');
			form.style.width = (props.width || 0) + 'px';
			form.style.height = (props.height || 0) + 'px';

			let header = document.createElement('div');
			header.classList.add('header');
			form.append(header);

			let title = document.createElement('span');
			title.classList.add('title');
			title.innerHTML = props.header || 'Share <b>Board name</b> with other';
			form.append(title);

			let area = new Area({
				emit: this.addEmails
			});
			form.append(area.getNode());

			let addEmail = new Button({
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
			addEmail.addEvent(this.generateEmail);
			addEmail.getNode();
			form.append(addEmail.getNode());

			let countEmails = new Button({
				value: 'Get emails count',
				btn: {
					width: 142,
					left: 164,
				},
				text: {
					left: 11.27,
					right: 10.56,
				}
			});
			countEmails.addEvent(this.getCountEmails);
			form.append(countEmails.getNode());

			props.container.append(form);
		}
	}

	public setEmails(emails: string[]): void {
		this.emails = emails;
		if (this.emit) {
			this.emit({
				name: 'setEmails',
				emails: this.emails
			});
		}
	}

	public getEmails(): string[] {
		return this.emails;
	}

	public subscribe(emit: IEmit): void {
		this.emit = emit;
	}

	private getCountEmails = (): number => {
		return this.emails.length;
	};

	private generateEmail = (): void => {
		this.emails.push(getEmail());
		if (this.emit) {
			this.emit({
				name: 'setEmails',
				emails: this.emails
			});
		}
	};

	private addEmails = (emails: string[]): void => {
		this.emails = this.emails.concat(emails);
		if (this.emit) {
			this.emit({
				name: 'setEmails',
				emails: this.emails
			});
		}
	};
}

if (process.env.NODE_ENV === 'development') {
	const emailsEditor = new EmailsEditor({
		container: document.querySelector('#emails-editor'),
		header: 'Share <b>Board name</b> with other',
		width: 540,
		height: 300
	});
	emailsEditor.setEmails(['john@miro.com']);
	emailsEditor.subscribe(({name, emails}: ISubscriber): void => {
		// eslint-disable-next-line no-console
		console.log('name: ', name, ' emails: ', emails);
	});
	emailsEditor.setEmails(['john@miro.com', 'patric@miro.com']);
	// eslint-disable-next-line no-console
	console.log('getEmails: ', emailsEditor.getEmails());
}