import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';
import { Bookmark, UUID } from 'lib';
import { isInvalid } from 'modules/shared';
import { AutoComplete } from 'primeng/autocomplete';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { EditForm } from './bookmark-form';

@Component({
	selector: 'app-bookmark-form',
	templateUrl: './bookmark-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFormComponent implements OnInit, OnChanges, OnDestroy {

	@Input() bookmark: Bookmark | null | undefined;
	@Input() tagSuggestions: string[] | null | undefined;

	@Output() create: EventEmitter<Partial<Bookmark>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, bookmark: Partial<Bookmark> }> = new EventEmitter();
	@Output() tagInput: EventEmitter<string> = new EventEmitter();

	@ViewChild('autocomplete') autocompleteCharge!: AutoComplete;

	bookmark$: Subject<Bookmark>;
	tagSuggestions$: Subject<string[]>;
	form: EditForm;
	subscriptions: Subscription = new Subscription();
	formGroup: FormGroup;
	formName: FormControl;
	isPopular: boolean = false;

	constructor() {

		this.tagSuggestions$ = new Subject<string[]>();
		this.formName = new FormControl('');
		this.form = new EditForm(this.bookmark);
		this.formGroup = this.form.formGroup;
		this.bookmark$ = new BehaviorSubject<Bookmark>(this.formGroup.value);

	}

	ngOnInit(): void {

		this.subscriptions.add(
			this.form.formGroup.valueChanges.pipe(

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
			this.form.formGroup.patchValue({
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

		if (isInvalid(this.form.formGroup))
			return;

		const bookmark: Partial<Bookmark> = this.form.formGroup.value;
		if (bookmark.id)
			this.update.emit({ id: bookmark.id, bookmark });
		else
			this.create.emit(bookmark);

	}

	onTagInput(event: { e: InputEvent, query: string }): void {

		if (event.query.endsWith(' ')) {
			this.form.tags.patchValue([...this.form.tags.getRawValue(), event.query.substring(0, event.query.length - 1)]);
			this.tagSuggestions$.next([]);
			this.autocompleteCharge.multiInputEL.nativeElement.value = '';
		} else
			this.tagInput.emit(event.query);

	}

	lookupTitle(): void {

		const url: string = this.form.url.getRawValue();

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

		const url: string = this.form.url.getRawValue();

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
			console.error('err', err);
			return null;
		}

	}

}
