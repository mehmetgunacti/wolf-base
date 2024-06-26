import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID, Word } from 'lib';
import { Observable, Subject } from 'rxjs';

@Component({
	selector: 'app-word-edit-form-container',
	templateUrl: './word-edit-form-container.component.html',
	styleUrls: ['./word-edit-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordEditFormContainerComponent implements OnInit, AfterContentInit {

	private store: Store = inject(Store);

	word$: Observable<Word | null | undefined>;

	constructor() {

		this.word$ = new Subject();

	}

	ngOnInit(): void { }

	ngAfterContentInit(): void {

		// this.tagSuggestions$ = combineLatest([
		// 	this.store.select(distinctTagsArray),
		// 	this.tagInput
		// ]).pipe(

		// 	map(([tags, tagInput]) => {

		// 		if (!!tagInput)
		// 			return tags.filter(t => t.name.startsWith(tagInput)).map(t => t.name);
		// 		return [];

		// 	})

		// );

	}

	onUpdate(id: UUID, word: Partial<Word>) {

		// this.store.dispatch(update({ id, word }));

	}

	onTagInput(val: string | null): void {

		// this.tagInput.next(val);

	}

}
