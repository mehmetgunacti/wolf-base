import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, Note, UUID } from 'lib';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { update } from 'store/actions/entity.actions';
import { selNote_array, selNote_selected } from 'store/selectors/note-selectors/note-entities.selectors';
import { distinctTagsArray } from 'store/selectors/note-selectors/note-tags.selectors';

@Component({
	selector: 'app-note-edit-form-container',
	templateUrl: './note-edit-form-container.component.html',
	styleUrls: ['./note-edit-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditFormContainerComponent implements OnInit, AfterContentInit {

	private store: Store = inject(Store);

	note$: Observable<Note | null | undefined>;
	nodes$: Observable<Note[]>;
	tagSuggestions$!: Observable<string[]>;
	tagInput = new Subject<string | null>();

	constructor() {

		this.note$ = this.store.select(selNote_selected);
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

	onUpdate(id: UUID, entity: Partial<Note>) {

		this.store.dispatch(update({ entityType: AppEntityType.note, id, entity }));

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
