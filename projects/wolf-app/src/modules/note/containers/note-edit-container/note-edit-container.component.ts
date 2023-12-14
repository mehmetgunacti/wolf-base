import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note, ToastConfiguration, UUID } from 'lib';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { showNotification } from 'store/actions/core-notification.actions';
import { create, moveToTrash, update } from 'store/actions/note.actions';
import { selCoreTitleLookupUrl } from 'store/selectors/core-configuration.selectors';
import { selNote } from 'store/selectors/note-selectors/note-entities.selectors';
import { distinctTagsArray } from 'store/selectors/note-selectors/note-tags.selectors';

@Component({
	selector: 'app-note-edit-container',
	templateUrl: './note-edit-container.component.html',
	styleUrls: ['./note-edit-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditContainerComponent implements OnInit, AfterContentInit {

	private store: Store = inject(Store);

	note$: Observable<Note | null | undefined>;
	tagSuggestions$!: Observable<string[]>;
	titleLookup$: Observable<string | null>;
	tagInput = new Subject<string | null>();

	constructor() {

		this.note$ = this.store.select(selNote);
		this.titleLookup$ = this.store.select(selCoreTitleLookupUrl);

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

	onUpdate(id: UUID, note: Partial<Note>) {

		this.store.dispatch(update({ id, note }));

	}

	onRemove(id: UUID): void {

		this.store.dispatch(moveToTrash({ id }));

	}

	onClose(): void {

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

	onTitleLookup(toast: ToastConfiguration): void {

		this.store.dispatch(showNotification(toast));

	}

}
