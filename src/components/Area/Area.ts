import {IEmit, ISubscriber} from '../../types/index';
import {Tag} from '../Tag/Tag';
import './Area.less';

export class Area {
	private readonly area: HTMLElement;
	private emit: IEmit | null = null;

	constructor() {
		this.area = this.init();
	}

	/**
	 * Метод для инициализации компонета, составление dom структуры и навешивание событий.
	 */
	private init(): HTMLElement {
		let area: HTMLDivElement = document.createElement('div');
		area.classList.add('container');

		let input: HTMLInputElement = document.createElement('input');
		input.classList.add('first-input');
		input.placeholder = 'add email';

		let firstItem: HTMLDivElement = document.createElement('div');
		firstItem.classList.add('first');

		input.addEventListener('keydown', this.handleKeydown, false);
		input.addEventListener('blur', this.handleSave);
		area.addEventListener('click', () => input.focus(), false);

		firstItem.append(input);
		area.append(firstItem);

		return area;
	}

	/**
	 * Метод сохранения изменения тега после потери фокуса.
	 *
	 * @param {HTMLElement} event instance объекта
	 */
	private handleSave = (event: Event): void => {
		if (event.target) {
			this.newTags(event.target['value']);
			event.target['value'] = '';
		}
	};

	/**
	 * Обработчик подписки на нажатия клавишь. Обрабатывается нажатие Enter при введенном тексте в поле
	 *
	 * @param {KeyboardEvent} event событие клавиатуры
	 */
	private handleKeydown = (event: KeyboardEvent): void => {
		if ((event.code == 'Enter' || event.code == 'NumpadEnter') && event.target) {
			this.newTags(event.target['value']);
			event.target['value'] = '';
		}
		if ((event.code == 'Comma' || (event.shiftKey && event.code == 'Slash')) && event.target) {
			let value = event.target['value'];
			this.newTags(value.substring(0, value.length - 1));
			event.target['value'] = '';
		}
	};

	/**
	 * Метод для добавления нового тега путем ввода и разбиение строка на несколько emails если ихскопировали из вне.
	 *
	 * @param {String} value введеная строка
	 */
	private newTags(value?: string): void {
		if (value != null && value != '') {
			let emails: string[] = value.replace(/\s/g, '').split(',').filter(x => x != '');
			emails.forEach(item => {
				let tag = new Tag(item);
				tag.subscribe(this.emitEmails);
				this.area.insertBefore(tag.getNode(), this.area.lastChild);
			});
			if (this.emit) {
				this.emit({
					name: 'newTag',
					emails: emails
				});
			}
		}
	};

	/**
	 * Метод для добавления новых emails к списку
	 *
	 * @param {String} name назваие event
	 * @param {String[]} emails список новых emails
	 */
	private emitEmails = ({name, emails}: ISubscriber): void => {
		if (emails && emails.length > 0) {
			if (this.emit) {
				this.emit({
					name: name,
					emails: emails
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

	/**
	 * Метод для получения текущего узла элемента
	 */
	public getNode(): HTMLElement {
		return this.area;
	}
}