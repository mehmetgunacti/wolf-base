import * as Croppie from 'croppie';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ICroppie {

	result$: Observable<string>;
	bound$: Observable<boolean>;
	init(el: HTMLElement): void;
	bind(url: string, sendResult?: boolean): void;
	unbind(): void;
	destroy(): void;

}

class CroppieImpl implements ICroppie {

	private croppie!: Croppie | null;
	private el!: HTMLElement;

	private result = new Subject<string>();
	get result$(): Observable<string> {
		return this.result.asObservable();
	}

	private bound = new BehaviorSubject<boolean>(false);
	get bound$(): Observable<boolean> {
		return this.bound.asObservable();
	}

	private eventListenerAdded = false;

	constructor(private options: Croppie.CroppieOptions) { }

	init(el: HTMLElement): void {
		this.el = el;

		this.destroy();
		this.createCroppie();
		this.addEventListener();
	}

	bind(url: string, sendResult: boolean = true): void {

		if (!this.el)
			throw Error('Croppie not initialized');

		if (!url) {
			this.unbind();
			return;
		}

		this.croppie?.bind({ url })
			// in case the user doesn't drag the image (so no 'update' event occurs)
			// we take the result right after bind
			.then(() => {
				this.bound.next(true);
				if (sendResult)
					this.resultCroppie();
			});

	}

	unbind(): void {

		this.bound.next(false);
		this.result.next('');

	}

	destroy(): void {

		if (this.croppie) {

			this.croppie.destroy();
			this.croppie = null;
			this.el = document.createElement('div');
			this.eventListenerAdded = false;

		}

	}

	private createCroppie(): void {

		this.croppie = new Croppie(this.el, this.options);

	}

	private addEventListener(): void {

		// only add listener once
		if (this.eventListenerAdded)
			return;

		this.el.addEventListener('update', () => this.resultCroppie());
		this.eventListenerAdded = true;

	}

	private resultCroppie(): void {

		if (this.croppie)
			this.croppie
				.result({
					type: 'base64',
					size: 'viewport',
					format: 'png',
					quality: 1,
					circle: this.options?.viewport?.type === 'circle'
				}).then(
					(result: string) => this.result.next(result)
				);

	}

}

export const createCroppie = (options: Croppie.CroppieOptions) => new CroppieImpl(options);


