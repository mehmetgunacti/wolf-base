import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { Bookmark, ToastConfiguration, UUID } from 'lib';
import { BehaviorSubject, Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { BOOKMARK_FORM, BookmarkForm, EditFormImpl } from './bookmark-form';

@Component({
	selector: 'app-bookmark-form',
	templateUrl: './bookmark-form.component.html',
	styleUrls: ['./bookmark-form.component.scss'],
	providers: [{ provide: BOOKMARK_FORM, useClass: EditFormImpl }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFormComponent implements OnInit, OnChanges, OnDestroy {

	@Input() bookmark: Bookmark | null | undefined;
	@Input() tagSuggestions: string[] | null | undefined;
	@Input() titleLookupUrl: string | null | undefined;

	@Output() create: EventEmitter<Partial<Bookmark>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, bookmark: Partial<Bookmark> }> = new EventEmitter();
	@Output() delete: EventEmitter<UUID> = new EventEmitter();
	@Output() tagInput: EventEmitter<string> = new EventEmitter();
	@Output() titleLookup: EventEmitter<ToastConfiguration> = new EventEmitter();

	// @ViewChild('autocomplete') autocompleteChange!: AutoComplete;

	form: BookmarkForm = inject(BOOKMARK_FORM);
	bookmark$: Subject<Bookmark>;
	tagSuggestions$: Subject<string[]>;
	subscriptions: Subscription = new Subscription();
	isPopular: boolean = false;

	constructor() {

		this.tagSuggestions$ = new Subject<string[]>();
		this.bookmark$ = new BehaviorSubject<Bookmark>(this.form.value);

	}

	ngOnInit(): void {

		if (this.bookmark)
			this.form.setValues(this.bookmark);

		this.subscriptions.add(

			this.form.valueChanges$.pipe(

				debounceTime(200),
				distinctUntilChanged()

			).subscribe(
				bookmark => this.bookmark$.next(bookmark)
			)

		);

		this.subscriptions.add(

			this.form.tags.valueChanges.subscribe(
				tags => this.isPopular = tags.includes('popular')
			)

		);

	}

	ngOnChanges(changes: SimpleChanges): void {

		const bookmark: Bookmark = changes['bookmark']?.currentValue;
		if (bookmark)
			this.form.patchValue({
				...bookmark,
			});

		const tagSuggestions: string[] = changes['tagSuggestions']?.currentValue;
		if (tagSuggestions)
			this.tagSuggestions$.next(tagSuggestions);

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();

	}

	onSave(): void {

		if (this.form.isInvalid())
			return;

		const bookmark: Bookmark = this.form.value;
		if (bookmark.id)
			this.update.emit({ id: bookmark.id, bookmark });
		else
			this.create.emit(bookmark);

	}

	onDelete(): void {

		if (!this.bookmark)
			return;

		if (
			confirm(`
${this.bookmark.name}
${this.bookmark.title}

will be deleted. Continue?`)
		)
			this.delete.emit(this.bookmark.id);

	}

	// onTagInput(event: AutoCompleteCompleteEvent): void {

	// 	if (event.query.endsWith(' ')) {

	// 		this.form.tags.patchValue([
	// 			...this.form.tags.getRawValue(),
	// 			event.query.substring(0, event.query.length - 1)
	// 		]);
	// 		this.tagSuggestions$.next([]);
	// 		if (this.autocompleteChange.multiInputEl)
	// 			this.autocompleteChange.multiInputEl.nativeElement.value = '';

	// 	} else
	// 		this.tagInput.emit(event.query);

	// }

	lookupTitle(): void {

		if (!this.titleLookupUrl) {

			this.titleLookup.emit({
				severity: 'warn',
				summary: 'Missing Configuration',
				detail: 'Title Lookup Url'
			});
			return;

		}

		// there's always a FormControl at index 0
		const url: string = this.form.urls.at(0).getRawValue();
		if (
			!(url.startsWith('https://') || url.startsWith('https://'))
		) {

			this.titleLookup.emit({ severity: 'error', summary: 'Cannot Lookup URL', detail: `URL must start with 'http://' or 'https://'` });
			return;

		}

		// get the title of the web page
		const parsed: URL | null = this.parseURL(url);
		if (parsed) {

			const { origin, pathname } = parsed;
			const term = `${origin}${pathname}`;
			const remoteURL = this.titleLookupUrl + encodeURI(term);
			console.info('Looking up page title:', remoteURL);
			this.titleLookup.emit({ severity: 'info', detail: 'Looking up title...' });
			fetch(remoteURL)
				.then(
					response => response.text().then(
						title => {
							console.info(remoteURL, ' returned: [', title, ']');
							this.form.title.setValue(title);
							this.form.title.markAsDirty();
							this.titleLookup.emit({ severity: 'success', detail: 'Title Lookup Successful' });
						}
					)
				)
				.catch(err => {

					console.error('Lookup failed:', remoteURL);
					this.titleLookup.emit({ severity: 'error', detail: 'Title Lookup Failed' });

				});

		} else
			this.titleLookup.emit({ severity: 'error', detail: 'Could not parse URL' });

	}

	nameFromURL(): void {

		// there's always a FormControl at index 0
		const url: string = this.form.urls.at(0).getRawValue();

		// set hostname as bookmark name
		const parsed: URL | null = this.parseURL(url);
		if (parsed) {

			const hostname = parsed.hostname;
			this.form.name.setValue(hostname.startsWith('www.') ? hostname.substring(4) : hostname);
			this.form.name.markAsDirty();

		}

	}

	onTogglePopular(): void {

		const POPULAR = 'popular';
		const tags: string[] = this.form.tags.value;
		this.form.tags.setValue(
			tags.includes(POPULAR) ? tags.filter(v => v !== POPULAR) : [POPULAR, ...tags]
		);

	}

	private parseURL(url: string): URL | null {

		try {
			return new URL(url.toLowerCase());
		} catch (err) {
			console.error('url:', url);
			console.error('err', err, url);
			return null;
		}

	}

	addURL(): void {

		this.form.addURL();

	}

	removeURL(idx: number): void {

		this.form.removeURL(idx);

	}

	checkUrl(event: Event): void {

		const inputElement = event.target as HTMLInputElement;
		const value = inputElement.value;

		if (value === "h" || value === "H")
			inputElement.value = "https://www.";

	}

}
