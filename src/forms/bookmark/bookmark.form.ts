import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BookmarkComponent } from '@components';
import { TAG_POPULAR, UUID } from '@constants';
import { GlyphDirective } from '@directives';
import { BaseComponent, CroppieComponent, InputComponent, InputTagComponent, ToastConfiguration } from '@libComponents';
import { Bookmark, ClickedBookmark } from '@models';
import { parseURL } from '@utils';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { BOOKMARK_FORM, BookmarkForm1, EditFormImpl } from './bookmark-form';

@Component({
	standalone: true,
	imports: [ InputComponent, InputTagComponent, ReactiveFormsModule, GlyphDirective, AsyncPipe, CroppieComponent, BookmarkComponent ],
	selector: 'app-bookmark-form',
	templateUrl: './bookmark.form.html',
	providers: [ { provide: BOOKMARK_FORM, useClass: EditFormImpl } ],
	host: { 'class': '' }
})
export class BookmarkForm extends BaseComponent implements OnInit, OnChanges, OnDestroy {

	TAG_POPULAR = TAG_POPULAR;

	@Input() bookmark: Bookmark | null | undefined;
	@Input() tagSuggestions: string[] | null | undefined;
	@Input() titleLookupUrl: string | null | undefined;

	@Output() create: EventEmitter<Partial<Bookmark>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, bookmark: Partial<Bookmark>; }> = new EventEmitter();
	@Output() remove: EventEmitter<UUID> = new EventEmitter();
	@Output() tagInput: EventEmitter<string | null> = new EventEmitter();
	@Output() titleLookup: EventEmitter<ToastConfiguration> = new EventEmitter();

	form: BookmarkForm1 = inject(BOOKMARK_FORM);
	bookmark$: Observable<ClickedBookmark>;
	tagSuggestions$: Subject<string[]>;

	constructor() {

		super();
		this.tagSuggestions$ = new Subject<string[]>();
		this.bookmark$ = this.form.valueChanges$.pipe(

			debounceTime(200),
			distinctUntilChanged()

		);

	}

	ngOnInit(): void { }

	ngOnChanges(changes: SimpleChanges): void {

		const bookmark: ClickedBookmark = changes[ 'bookmark' ]?.currentValue;
		if (bookmark)
			this.form.setValues(bookmark);

		const tagSuggestions: string[] = changes[ 'tagSuggestions' ]?.currentValue;
		if (tagSuggestions)
			this.tagSuggestions$.next(tagSuggestions);

	}

	ngOnDestroy(): void { }

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
			this.remove.emit(this.bookmark.id);

	}

	onTagInput(val: string | null): void {

		this.tagInput.emit(val);

	}

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
			!(url.startsWith('http://') || url.startsWith('https://'))
		) {

			this.titleLookup.emit({ severity: 'error', summary: 'Cannot Lookup URL', detail: `URL must start with 'http://' or 'https://'` });
			return;

		}

		// get the title of the web page
		const parsed: URL | null = parseURL(url);
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
		const parsed: URL | null = parseURL(url);
		if (parsed) {

			const hostname = parsed.hostname;
			this.form.name.setValue(hostname.startsWith('www.') ? hostname.substring(4) : hostname);
			this.form.name.markAsDirty();

		}

	}

	onTogglePopular(): void {

		const tags: string[] = this.form.tags.value;
		this.form.tags.setValue(
			tags.includes(TAG_POPULAR) ? tags.filter(v => v !== TAG_POPULAR) : [ TAG_POPULAR, ...tags ]
		);
		this.form.tags.markAsDirty();
		this.form.tags.updateValueAndValidity();

	}

	addURL(): void {

		this.form.addURL();

	}

	removeURL(idx: number): void {

		this.form.removeURL(idx);

	}

	// todo add this back
	checkUrl(value: string, fc: FormControl): void {

		if (value === "h" || value === "H")
			fc.setValue("https://www.");

	}

}
