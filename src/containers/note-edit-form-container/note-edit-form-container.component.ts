import { entityActions } from '@actions/entity.actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { NoteFormComponent } from '@forms/note-form/note-form.component';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Note } from '@models/note.model';
import { Store } from '@ngrx/store';
import { selNote_EntityList } from '@selectors/entity/entity-note.selectors';
import { selNote_distinctTagsArray } from '@selectors/note/note-tags.selectors';
import { selNote_SelectedEntity } from '@selectors/note/note-ui.selectors';
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
