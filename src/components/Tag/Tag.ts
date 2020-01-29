import {IEmit} from '../../types/index';
import {validEmail} from '../../utils/checkValidEmail';
import './Tag.less';

export class Tag {
	/**
	 * Метод для создания иконки exit
	 */
	private static createSVG(): SVGSVGElement {
		let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('width', '8');
		svg.setAttribute('height', '8');
		svg.setAttribute('viewBox', '0 0 8 8');
		svg.setAttribute('fill', 'none');
		let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('fill-rule', 'evenodd');
		path.setAttribute('clip-rule', 'evenodd');
		path.setAttribute('d', 'M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z');
		path.setAttribute('fill', '#050038');
		svg.appendChild(path);
		return svg;
	}

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

		let svg: SVGSVGElement = Tag.createSVG();
		svg.classList.add('email-exit');

		tag.append(input);
		tag.append(content);
		tag.append(svg);

		input.addEventListener('input', this.handleChange.bind(this, tag));
		input.addEventListener('blur', this.handleSave.bind(this, tag));
		content.addEventListener('dblclick', (e: MouseEvent) => {
			e.stopPropagation();
		});
		content.addEventListener('click', this.handleEdit.bind(this, tag, input));
		svg.addEventListener('click', this.handleDelete.bind(this, tag));
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