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
	imports: [ PortalComponent, RouterLink, GlyphDirective, AsyncPipe, NoteFormComponent ],
	selector: 'app-note-new-form-container',
	templateUrl: './note-new-form-container.component.html',
	host: { 'class': 'flex flex-col' },
})
export class NoteNewFormContainer extends BaseComponent {

	private store: Store = inject(Store);

	parentId$: Observable<UUID | null>;
	cancelLink$: Observable<string[]>;
	nodes = this.store.selectSignal(selNote_EntityList);
	tagSuggestions$!: Observable<string[]>;
	tagInput = new Subject<string | null>();

	constructor() {

		super();
		this.parentId$ = this.store.select(selNote_SelectedEntity).pipe(

			map(p => p ? p.id : null)

		);
		this.cancelLink$ = this.parentId$.pipe(

			map(id => id ? [ '/notes', id ] : [ '/notes' ])

		);

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

	onCreate(entity: Partial<Note>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.note, entity }));

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
