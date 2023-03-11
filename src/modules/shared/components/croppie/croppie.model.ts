import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface CroppieWrapper {

	result$: Observable<string>;
	imageLoaded$: Observable<boolean>;
	initialized$: Observable<boolean>;
	init(croppie: Croppie, el: HTMLElement): void;
	bind(url: string, sendResult?: boolean): void;
	unbind(): void;
	destroy(): void;

}

class CroppieWrapperImpl implements CroppieWrapper {

	private result = new Subject<string>();
	private imageLoaded = new BehaviorSubject<boolean>(false);
	private initialized = new BehaviorSubject<boolean>(false);

	result$: Observable<string> = this.result.asObservable();
	imageLoaded$: Observable<boolean> = this.imageLoaded.asObservable();
	initialized$: Observable<boolean> = this.initialized.asObservable();

	private eventListenerAdded = false;

	private _croppie: Croppie | undefined | null;
	private set croppie(croppie: Croppie | null) {
		this._croppie = croppie;
		this.initialized.next(true);
	}

	constructor(
		private options: Croppie.CroppieOptions
	) { }

	init(croppie: Croppie, el: HTMLElement): void {

		this.croppie = croppie;
		this.addEventListener(el);

	}

	destroy(): void {

		if (this._croppie) {

			this._croppie.destroy();
			this._croppie = null;
			this.eventListenerAdded = false;
			this.initialized.next(false);

		}

	}

	private addEventListener(el: HTMLElement): void {

		// only add listener once
		if (this.eventListenerAdded)
			return;

		el.addEventListener('update', () => this.resultCroppie());
		this.eventListenerAdded = true;

	}

	bind(url: string, sendResult: boolean = true): void {

		if (!this._croppie)
			throw Error('Croppie not initialized');

		if (!url) {
			this.unbind();
			return;
		}

		this._croppie.bind({ url })
			// in case the user doesn't drag the image (so no 'update' event occurs)
			// we take the result right after bind
			.then(() => {
				this.imageLoaded.next(true);
				if (sendResult)
					this.resultCroppie();
			});

	}

	unbind(): void {

		this.imageLoaded.next(false);
		this.result.next('');

	}

	private resultCroppie(): void {

		if (this._croppie)
			this._croppie
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

export const createCroppie = (options: Croppie.CroppieOptions): CroppieWrapper => new CroppieWrapperImpl(options);


