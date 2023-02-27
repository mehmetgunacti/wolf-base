import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookmark } from 'lib';
import { combineLatest, filter, map, Observable, Subject } from 'rxjs';
import * as fromStore from '../../store';

@Component({
	selector: 'app-bookmark-edit-container',
	templateUrl: './bookmark-edit-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkEditContainerComponent {

	tagSuggestions$!: Observable<string[]>;
	tagInput = new Subject<string>();

	@Input() bookmark: Bookmark | undefined;

	constructor(
		private store: Store<fromStore.BookmarksState>
	) {
		console.log(this.bookmark);
	}

	ngOnInit(): void { }

	ngAfterContentInit(): void {

		this.tagSuggestions$ = combineLatest([
			this.store.select(fromStore.selectorTagsArray),
			this.tagInput
		]).pipe(

			filter(([tags, tagInput]) => !!tagInput && tags.length > 0),
			map(

				([tags, tagInput]) =>
					tags
						.filter(t => t.id.startsWith(tagInput))
						.map(t => t.id)

			)

		);

	}



	onSave(f: Bookmark): void {

		console.log(f);
		// if (this.formGroup.invalid)
		// 	markFieldsAsDirty(this.formGroup);

		// else if (

		// 	this.formGroup.dirty &&
		// 	this.formGroup.valid

		// ) {

		// 	const payload: any = {
		// 		...getDirtyValues<Bookmark>(this.formGroup),
		// 		id: this.bookmark?.id
		// 	};
		// 	this.store.dispatch(fromStore.bookmarksUpsert({ payload }));
		// 	this.close();

		// }

	}

	delete(): void {

		const id = this.bookmark?.id;
		if (!!id)
			if (
				confirm(`
					${this.bookmark?.title}
					${this.bookmark?.url}

					will be deleted. Continue?
				`)
			)
				this.store.dispatch(fromStore.bookmarksDelete({ id }));

	}

	close(): void { }

	onTagInput(val: string): void {

		this.tagInput.next(val);

	}

}
