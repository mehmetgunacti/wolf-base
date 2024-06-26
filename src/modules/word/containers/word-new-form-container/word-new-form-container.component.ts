import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Word, UUID } from 'lib';
import { Observable, Subject, combineLatest, map } from 'rxjs';

@Component({
	selector: 'app-word-new-form-container',
	templateUrl: './word-new-form-container.component.html',
	styleUrls: ['./word-new-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordNewFormContainerComponent implements OnInit, AfterContentInit {

	private store: Store = inject(Store);

	parentId$: Observable<UUID | null>;
	cancelLink$: Observable<string[]>;
	nodes$: Observable<Word[]>;

	constructor() {

		this.parentId$ = new Subject();

		// this.store.select(selWord_selected).pipe(

		// 	map(p => p ? p.id : null)

		// );
		this.cancelLink$ = this.parentId$.pipe(

			map(id => id ? ['/words', id] : ['/words'])

		);
		this.nodes$ = new Subject(); // this.store.select(selWord_array);

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

	onCreate(word: Partial<Word>): void {

		// this.store.dispatch(create({ word }));

	}

	onTagInput(val: string | null): void {

		// this.tagInput.next(val);

	}

}
