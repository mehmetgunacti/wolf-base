import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TAG_PINNED, UUID, Word } from 'lib';
import { Observable, Subject, map } from 'rxjs';

@Component({
	selector: 'app-words-container',
	templateUrl: './words-container.component.html',
	styleUrls: ['./words-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsContainerComponent {

	TAG_PINNED = TAG_PINNED;

	private store: Store = inject(Store);

	queryParamsAsString$: Observable<string | null>;
	isFiltered$: Observable<boolean>;
	words$: Observable<Word[]>;

	constructor() {

		const queryParams$ = new Subject(); // this.store.select(selWord_queryParams);

		this.queryParamsAsString$ = queryParams$.pipe(
			map(params => {

				// if (!!params.search && params.tags.length > 0)
				// 	return `"${params.search}", [${params.tags}]`;

				// if (!!params.search)
				// 	return `"${params.search}"`;

				// return `[${params.tags}]`
				return 'abc';

			})
		)

		this.isFiltered$ = new Subject();
		// queryParams$.pipe(
		// 	map(params => params.tags.length > 0 || !!params.search)
		// );

		this.words$ = new Subject();

		// this.isFiltered$.pipe(

		// 	switchMap(filtered =>

		// 		iif(

		// 			() => filtered,
		// 			this.store.select(selWord_filteredWords),
		// 			this.store.select(selWord_rootArray)

		// 		)

		// 	)

		// );

	}

	onEdit(id: UUID): void {

	}

}
