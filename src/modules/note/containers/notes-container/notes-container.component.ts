import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note, QueryParams, UUID } from 'lib';
import { Observable, iif, map, switchMap } from 'rxjs';
import { selNote_rootArray } from 'store/selectors/note-selectors/note-entities.selectors';
import { selNote_filteredNotes, selNote_queryParams } from 'store/selectors/note-selectors/note-tags.selectors';

@Component({
	selector: 'app-notes-container',
	templateUrl: './notes-container.component.html',
	styleUrls: ['./notes-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesContainerComponent {

	private store: Store = inject(Store);

	queryParamsAsString$: Observable<string | null>;
	isFiltered$: Observable<boolean>;
	notes$: Observable<Note[]>;

	constructor() {

		const queryParams$ = this.store.select(selNote_queryParams);

		this.queryParamsAsString$ = queryParams$.pipe(
			map(params => {

				if (!!params.search && params.tags.length > 0)
					return `"${params.search}", [${params.tags}]`;

				if (!!params.search)
					return `"${params.search}"`;

				return `[${params.tags}]`

			})
		)

		this.isFiltered$ = queryParams$.pipe(
			map(params => params.tags.length > 0 || !!params.search)
		);

		this.notes$ = this.isFiltered$.pipe(

			switchMap(filtered =>

				iif(

					() => filtered,
					this.store.select(selNote_filteredNotes),
					this.store.select(selNote_rootArray)

				)

			)

		);

	}

	onEdit(id: UUID): void {

	}

}
