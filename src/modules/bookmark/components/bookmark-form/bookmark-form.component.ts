import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { Bookmark, UUID } from 'lib';
import { AutoComplete } from 'primeng/autocomplete';
import { BehaviorSubject, Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { BOOKMARK_FORM, BookmarkForm, EditFormImpl } from './bookmark-form';
import { formatCurrency } from '@angular/common';
import { themeSet } from 'store';

@Component({
	selector: 'app-bookmark-form',
	templateUrl: './bookmark-form.component.html',
	providers: [{ provide: BOOKMARK_FORM, useClass: EditFormImpl }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFormComponent implements OnInit, OnChanges, OnDestroy {

	@Input() bookmark: Bookmark | null | undefined;
	@Input() tagSuggestions: string[] | null | undefined;

	@Output() create: EventEmitter<Partial<Bookmark>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, bookmark: Partial<Bookmark> }> = new EventEmitter();
	@Output() tagInput: EventEmitter<string> = new EventEmitter();

	@ViewChild('autocomplete') autocompleteCharge!: AutoComplete;

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

		if (this.bookmark) {
			console.log(this.bookmark);
			this.form.setValues(this.bookmark);
			console.log(this.form);
		}

		this.subscriptions.add(

			this.form.valueChanges.pipe(

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

	onTagInput(event: { e: InputEvent, query: string }): void {

		if (event.query.endsWith(' ')) {

			this.form.tags.patchValue([
				...this.form.tags.getRawValue(),
				event.query.substring(0, event.query.length - 1)
			]);
			this.tagSuggestions$.next([]);
			this.autocompleteCharge.multiInputEL.nativeElement.value = '';

		} else
			this.tagInput.emit(event.query);

	}

	lookupTitle(): void {

		// there's always a FormControl at index 0
		const url: string = this.form.urls.at(0).getRawValue();

		// get the title of the web page
		const parsed: URL | null = this.parseURL(url);
		if (parsed) {

			const { origin, pathname } = parsed;
			const term = `${origin}${pathname}`;
			const remoteURL = environment.remoteURLLookup + encodeURI(term);
			console.info('Looking up page title:', remoteURL);
			fetch(remoteURL).then(
				response => response.text().then(
					title => {
						console.info(remoteURL, ' returned: [', title, ']');
						this.form.title.setValue(title);
						this.form.title.markAsDirty();
					}
				)
			);

		}

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

}
