import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note, UUID } from 'lib';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { create } from 'store/actions/note.actions';
import { selNote_array, selNote_selected } from 'store/selectors/note-selectors/note-entities.selectors';
import { distinctTagsArray } from 'store/selectors/note-selectors/note-tags.selectors';

@Component({
	selector: 'app-note-new-form-container',
	templateUrl: './note-new-form-container.component.html',
	styleUrls: ['./note-new-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteNewFormContainerComponent implements OnInit, AfterContentInit {

	private store: Store = inject(Store);

	parentId$: Observable<UUID | null>;
	cancelLink$: Observable<string[]>;
	nodes$: Observable<Note[]>;
	tagSuggestions$!: Observable<string[]>;
	tagInput = new Subject<string | null>();

	constructor() {

		this.parentId$ = this.store.select(selNote_selected).pipe(

			map(p => p ? p.id : null)

		);
		this.cancelLink$ = this.parentId$.pipe(

			map(id => id ? ['/notes', id] : ['/notes'])

		);
		this.nodes$ = this.store.select(selNote_array);

	}

	ngOnInit(): void { }

	ngAfterContentInit(): void {

		this.tagSuggestions$ = combineLatest([
			this.store.select(distinctTagsArray),
			this.tagInput
		]).pipe(

			map(([tags, tagInput]) => {

				if (!!tagInput)
					return tags.filter(t => t.name.startsWith(tagInput)).map(t => t.name);
				return [];

			})

		);

	}

	onCreate(note: Partial<Note>): void {

		this.store.dispatch(create({ note }));

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
