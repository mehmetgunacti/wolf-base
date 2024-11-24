import { InjectionToken } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { Bookmark } from '@models/bookmark.model';
import { fa, fc, fg, nnfc } from '@utils/form.util';

interface BookmarkFormSchema {

	id: FormControl<string | null>;
	name: FormControl<string>;
	title: FormControl<string>;
	tags: FormControl<string[]>;
	image: FormControl<string | null | undefined>;
	urls: FormArray<FormControl<string>>;

}

function createFormGroup(value?: Bookmark): FormGroup<BookmarkFormSchema> {

	const {

		id = null,
		name = '',
		title = '',
		tags = [],
		image = null,
		urls = [ '' ]

	} = value ?? {};

	return fg<BookmarkFormSchema>({

		id: fc(id),
		name: nnfc(name, Validators.required),
		title: nnfc(title, Validators.required),
		tags: nnfc(tags, Validators.required),
		image: nnfc<string | null | undefined>(image),
		urls: fa(urls.map(c => nnfc(c, Validators.required)))

	});

}

export class BookmarkFormImpl {

	fg: FormGroup<BookmarkFormSchema> = createFormGroup();

	populate(entity: Bookmark): void {

		const fg = this.fg;
		const { id, name, title, tags, image, urls } = entity;

		// populate (non-array values)
		fg.patchValue({ id, name, title, tags, image });

		// populate urls
		const fa = fg.controls.urls;
		fa.clear();
		urls.forEach(context => fa.push(nnfc(context, Validators.required)));

	}

	addUrl(): void {

		this.urls.controls.push(nnfc('', Validators.required));

	}

	removeUrl(idx: number): void {

		this.urls.removeAt(idx);

	}

	get id(): FormControl<UUID | null> { return this.fg.controls.id; }
	get name(): FormControl<string> { return this.fg.controls.name; }
	get title(): FormControl<string> { return this.fg.controls.title; }
	get tags(): FormControl<string[]> { return this.fg.controls.tags; }
	get image(): FormControl<string | null | undefined> { return this.fg.controls.image; }
	get urls(): FormArray<FormControl<string>> { return this.fg.controls.urls; }

}

export const BOOKMARK_FORM = new InjectionToken<BookmarkFormImpl>('BOOKMARK_FORM');
