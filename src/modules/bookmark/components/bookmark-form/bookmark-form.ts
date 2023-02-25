import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isURL } from '@fireflysemantics/validatorts';
import { Bookmark } from 'lib';
import { IFormClass } from 'modules/shared';
import { debounceTime, distinctUntilChanged, filter, map, Subscription } from 'rxjs';
import * as PSL from 'psl';

export class EditForm implements IFormClass<Bookmark> {

	private _formGroup: FormGroup;
	private subscriptions: Subscription = new Subscription();

	constructor(bookmark: Bookmark | null | undefined) {

		if (bookmark)
			this.setProperties(bookmark);

		this._formGroup = new FormGroup({
			name: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
			title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
			tags: new FormControl(['abc', 'def', 'ghi'], { validators: [Validators.required], nonNullable: true }),
			image: new FormControl(''),
			url: new FormControl('', { validators: [Validators.required], nonNullable: true })
		});

		this.subscriptions.add(
			this.url.valueChanges.pipe(

				debounceTime(2000),
				distinctUntilChanged(),
				filter(url => !!url),
				filter(url => !!(isURL(url || '', { require_protocol: true }).value)),
				map((url: string) => new URL(url.toLowerCase()))

			).subscribe(
				url => {

					// set name
					const parsed = PSL.parse(url.hostname) as PSL.ParsedDomain;
					if (parsed.domain) {
						this.name.setValue(parsed.domain);
						this.name.markAsDirty();
					}

					// get the title of the web page
					const { origin, pathname } = url;
					const term = `${origin}${pathname}`;
					fetch('https://title.mihir.ch/' + encodeURI(term)).then(
						response => response.text().then(
							title => {
								this.title.setValue(title);
								this.title.markAsDirty();
							}
						)
					);

				}
			)
		);

	}

	get name(): FormControl<string> {
		return <FormControl<string>> this._formGroup.controls['name'];
	}

	get title(): FormControl<string> {
		return <FormControl<string>> this._formGroup.controls['title'];
	}
	
	get tags(): FormControl<string[]> {
		return <FormControl<string[]>> this._formGroup.controls['tags'];
	}
	
	get image(): FormControl<string | null> {
		return <FormControl<string | null>> this._formGroup.controls['image'];
	}
	
	get url(): FormControl<string> {
		return <FormControl<string>> this._formGroup.controls['url'];
	}

	setProperties(bookmark: Bookmark): void {

		this.name.setValue(bookmark.name);
		this.title.setValue(bookmark.title);
		this.tags.setValue(bookmark.tags);
		this.image.setValue(bookmark.image);
		this.url.setValue(bookmark.url);

	}

	get formGroup(): FormGroup {
		return this._formGroup;
	}

	destroy(): void {
		this.subscriptions.unsubscribe();
	}

}