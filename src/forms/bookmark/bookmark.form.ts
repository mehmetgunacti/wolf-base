import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TAG_POPULAR, UUID } from '@constants';
import { GlyphDirective } from '@directives';
import { BaseComponent, CroppieComponent, InputComponent, InputTagComponent, ToastConfiguration } from '@libComponents';
import { Bookmark, ClickedBookmark } from '@models';
import { parseURL } from '@utils';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { CompactBookmarkComponent } from "../../components/compact-bookmark/compact-bookmark.component";
import { PortalComponent } from "../../lib/components/portal.component";
import { BOOKMARK_FORM, BookmarkFormImpl } from './bookmark-form';

@Component({
	standalone: true,
	imports: [ InputComponent, InputTagComponent, ReactiveFormsModule, GlyphDirective, AsyncPipe, CroppieComponent, CompactBookmarkComponent, PortalComponent ],
	selector: 'app-bookmark-form',
	templateUrl: './bookmark.form.html',
	providers: [ { provide: BOOKMARK_FORM, useClass: BookmarkFormImpl } ],
	host: { 'class': 'flex flex-col gap-4' }
})
export class BookmarkForm extends BaseComponent {

	TAG_POPULAR = TAG_POPULAR;

	// INPUT
	bookmark = input<Bookmark | null>();
	tagSuggestions = input<string[]>([]);
	titleLookupUrl = input<string | null>(null);

	// OUTPUT
	create = output<Partial<Bookmark>>();
	update = output<{ id: UUID, bookmark: Partial<Bookmark>; }>();
	remove = output<UUID>();
	tagInput = output<string | null>();
	titleLookup = output<ToastConfiguration>();

	protected form = inject(BOOKMARK_FORM);
	protected bookmark$: Observable<ClickedBookmark>;
	protected tagSuggestions$: Subject<string[]>;

	constructor() {

		super();
		this.tagSuggestions$ = new Subject<string[]>();
		this.bookmark$ = this.form.fg.valueChanges.pipe(

			startWith({ urls: [ '' ] } as Partial<ClickedBookmark>),
			map(partial => ({ id: 'dummy', clicks: 0, ...partial }) as ClickedBookmark),
			debounceTime(200),
			distinctUntilChanged()

		);

		effect(() => {

			const bm = this.bookmark();
			if (bm)
				this.form.populate(bm);

		});

		effect(() => {

			this.tagSuggestions$.next(this.tagSuggestions());

		});

	}

	onSave(): void {

		if (this.form.fg.invalid)
			return;

		const bookmark: Partial<Bookmark> = this.form.fg.value as Partial<Bookmark>;
		if (bookmark.id)
			this.update.emit({ id: bookmark.id, bookmark });
		else
			this.create.emit(bookmark);

	}

	onDelete(): void {

		const bm = this.bookmark();
		if (!bm)
			return;

		if (
			confirm(`
${bm.name}
${bm.title}

will be deleted. Continue?`)
		)
			this.remove.emit(bm.id);

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

		this.form.addUrl();

	}

	removeURL(idx: number): void {

		this.form.removeUrl(idx);

	}

	// todo add this back
	checkUrl(value: string, fc: FormControl): void {

		if (value === "h" || value === "H")
			fc.setValue("https://www.");

	}

}
