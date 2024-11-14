import { entityActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppEntityType, UUID } from '@constants';
import { GlyphDirective } from '@directives';
import { NoteFormComponent } from '@forms';
import { BaseComponent, PortalComponent } from '@libComponents';
import { Note } from '@models';
import { Store } from '@ngrx/store';
import { selNote_EntityList, selNote_SelectedEntity, selNote_distinctTagsArray } from '@selectors';
import { Observable, Subject, combineLatest, map } from 'rxjs';

@Component({
	standalone: true,
	imports: [ AsyncPipe, PortalComponent, RouterLink, GlyphDirective, NoteFormComponent ],
	selector: 'app-note-edit-form-container',
	templateUrl: './note-edit-form-container.component.html',
	host: { 'class': 'comp p-4' }
})
export class NoteEditFormContainer extends BaseComponent {

	private store: Store = inject(Store);

	note = this.store.selectSignal(selNote_SelectedEntity);
	nodes = this.store.selectSignal(selNote_EntityList);
	tagSuggestions$!: Observable<string[]>;
	tagInput = new Subject<string | null>();

	constructor() {

		super();
		this.tagSuggestions$ = combineLatest([
			this.store.select(selNote_distinctTagsArray),
			this.tagInput
		]).pipe(

			map(([ tags, tagInput ]) => {

				if (!!tagInput)
					return tags.filter(t => t.name.startsWith(tagInput)).map(t => t.name);
				return [];

			})

		);

	}

	onUpdate(id: UUID, entity: Partial<Note>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.note, id, entity }));

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
