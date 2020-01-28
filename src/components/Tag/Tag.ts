/*import remove from '../../assets/remove.svg';*/
import {validEmail} from '../../utils/checkValidEmail';
import './Tag.less';

interface ISubscriber {
	name: string;
	emails: string[];
}

interface IEmit {
	(item: ISubscriber): void;
}

export class Tag {
	private readonly tag: HTMLElement;
	private emit: IEmit | null = null;

	constructor(value: string) {
		this.tag = this.init(value);
	}

	/**
	 * Метод для инициализации компонета, составление dom структуры и навешивание событий.
	 */
	private init(value: string): HTMLElement {
		let tag: HTMLElement = document.createElement('div');
		tag.classList.add('tag');

		let input: HTMLInputElement = document.createElement('input');
		input.classList.add('email-input');
		input.value = value;

		let content: HTMLElement = document.createElement('div');
		content.classList.add('email-content');
		if (!validEmail(value)) {
			tag.classList.add('clear-background');
			content.classList.add('email-content', 'error');
		}
		content.innerText = value;

		let img: HTMLElement = document.createElement('span');
		img.classList.add('email-exit');
		img.innerHTML = 'x';

		tag.append(input);
		tag.append(content);
		tag.append(img);

		input.addEventListener('input', this.handleChange.bind(this, tag));
		input.addEventListener('blur', this.handleSave.bind(this, tag));
		content.addEventListener('dblclick', (e: MouseEvent) => {
			e.stopPropagation();
		});
		content.addEventListener('click', this.handleEdit.bind(this, tag, input));
		img.addEventListener('click', this.handleDelete.bind(this, tag));
		return tag;
	}

	/**
	 * Включать редактирование тега при клике по нему.
	 *
	 * @param {HTMLElement} tag instance объекта
	 * @param {HTMLElement} input instance объекта
	 * @param {MouseEvent} event нажатия на div
	 */
	private handleEdit = (tag: HTMLElement, input: HTMLElement, event: MouseEvent): void => {
		let contentEl: Element | null = tag.querySelector('.email-content');
		let svgEl: Element | null = tag.querySelector('.email-exit');
		if (input && contentEl && svgEl) {
			tag.classList.add('clear-background');
			input.classList.add('show');
			contentEl.classList.add('hide');
			svgEl.classList.add('hide');
			input.focus();
			event.stopPropagation();
		}
	};

	/**
	 * Включать редактирование тега при клике по нему.
	 */
	private handleChange = (tag: HTMLElement, event: Event): void => {
		let content: Element | null = tag.querySelector('.email-content');
		if (content && event.target) {
			content.innerHTML = event.target['value'];
		}
	};

	/**
	 * Метод сохранения изменения тега после потери фокуса.
	 *
	 * @param {HTMLElement} tag instance объекта
	 */
	private handleSave = (tag: HTMLElement): void => {
		let input: Element | null = tag.querySelector('.email-input');
		let content: Element | null = tag.querySelector('.email-content');
		let svg: Element | null = tag.querySelector('.email-exit');
		if (input && content && svg && content.textContent) {
			tag.classList.remove('clear-background');
			input.classList.remove('show');
			content.classList.remove('hide');
			svg.classList.remove('hide');
			if (validEmail(content.textContent)) {
				tag.classList.remove('clear-background');
				content.classList.remove('error');
			} else {
				tag.classList.add('clear-background');
				content.classList.add('error');
			}
			if (this.emit) {
				this.emit({
					name: 'changeTag',
					emails: [content.textContent]
				});
			}
		}
	};

	/**
	 * Метод сохранения изменения тега после потери фокуса.
	 *
	 * @param {HTMLElement} tag instance объекта
	 */
	private handleDelete = (tag: HTMLElement): void => {
		let content: Element | null = tag.querySelector('.email-content');
		tag.remove();
		if (this.emit && content && content.textContent) {
			this.emit({
				name: 'deleteTag',
				emails: [content.textContent]
			});
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
		return this.tag;
	}
}