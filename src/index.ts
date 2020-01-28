import {Area} from './components/Area/Area';
import {Button} from './components/Button/Button';
import {Tag} from './components/Tag/Tag';
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
	private emit: IEmit | null = null;
	private area: Area;
	private emails: string[] = [];

	constructor(props: IEmailsEditor) {
		this.init(props);
	}

	/**
	 * Метод для инициализации компонета, составление dom структуры и навешивание событий.
	 */
	private init(props: IEmailsEditor): void {
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

			this.area = new Area();
			this.area.subscribe(this.addEmails);
			form.append(this.area.getNode());

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
	};

	/**
	 * Метод для добавления к списку emails.
	 */
	public setEmails = (emails: string[]): void => {
		if (emails && emails.length > 0) {
			let newList = emails.filter(x => this.emails.indexOf(x));
			this.emails = this.emails.concat(newList);
			newList.forEach(email => {
				let tag = new Tag(email);
				this.area.getNode().insertBefore(tag.getNode(), this.area.getNode().lastChild);
			});
			if (this.emit) {
				this.emit({
					name: 'setEmails',
					emails: this.emails
				});
			}
		}
	};

	private getCountEmails = (): void => {
		alert(this.emails.length);
	};

	/**
	 * Метод для генерации случайного emails и добавление его в конец списка.
	 */
	private generateEmail = (): void => {
		const email = getEmail();
		this.emails.push(email);
		let tag = new Tag(email);
		this.area.getNode().insertBefore(tag.getNode(), this.area.getNode().lastChild);
		if (this.emit) {
			this.emit({
				name: 'generateEmail',
				emails: this.emails
			});
		}
	};

	/**
	 * Метод для добавления новых emails к списку
	 *
	 * @param {String} name назваие event
	 * @param {String[]} emails список новых emails
	 */
	private addEmails = ({name, emails}: ISubscriber): void => {
		if (emails && emails.length > 0) {
			switch (name) {
				case 'newTag': {
					this.emails = this.emails.concat(emails);
					break;
				}
				case 'changeTag': {// TODO нужно ли редактирование
					this.emails = this.emails.concat(emails);
					break;
				}
				case 'deleteTag': {
					this.emails = this.emails.filter(x=> emails.indexOf(x));
					break;
				}
			}
			if (this.emit) {
				this.emit({
					name: name,
					emails: this.emails
				});
			}
		}
	};

	/**
	 * Метод для иницализации подписки.
	 *
	 * @param {IEmit} emit функция которая будет вызываться при поднятии собятия.
	 */
	public subscribe(emit: IEmit): void {
		this.emit = emit;
	}

	public getEmails(): string[] {
		return this.emails;
	}
}

if (process.env.NODE_ENV === 'development') {
	const emailsEditor = new EmailsEditor({
		container: document.querySelector('#emails-editor'),
		header: 'Share <b>Board name</b> with other',
		width: 700,
		height: 300
	});

	emailsEditor.subscribe(({name, emails}: ISubscriber): void => {
		// eslint-disable-next-line no-console
		console.log('emails-editor - name: ', name, ' emails: ', emails);
	});
	emailsEditor.setEmails(['john@miro.com', 'patric@miro.com']);

	const emailsEditorSupport = new EmailsEditor({
		container: document.querySelector('#emails-editor-support'),
		header: 'Share <b>Board name</b> with other',
		width: 700,
		height: 300
	});
	emailsEditorSupport.subscribe(({name, emails}: ISubscriber): void => {
		// eslint-disable-next-line no-console
		console.log('emails-editor-support - name: ', name, ' emails: ', emails);
	});
	emailsEditorSupport.setEmails(['john@miro.com']);
}