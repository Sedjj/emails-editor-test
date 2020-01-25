import './index.less';

interface IEmailsEditor {
	container: Element | null;
	name: string;
}

interface ISubscriber {
	name: string;
	emails: string[];
}

interface IEmit {
	(item: ISubscriber): void;
}

export class EmailsEditor {
	private container: Element | null = null;
	private emit: IEmit | null = null;
	private emails: string[] = [];

	constructor(props: IEmailsEditor) {
		if (props.container != null) {
			this.container = props.container;
			let form = document.createElement('div');
			form.innerText = 'Hello';
			this.container.append(form);
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
}

if (process.env.NODE_ENV === 'development') {
	const emailsEditor = new EmailsEditor({
		container: document.querySelector('#emails-editor'),
		...{
			name: '1'
		}
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