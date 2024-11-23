import { entityActions } from '@actions/entity.actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { NoteForm } from '@forms/note/note.form';
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
	imports: [ PortalComponent, RouterLink, GlyphDirective, AsyncPipe, NoteForm ],
	selector: 'app-note-new-form-container',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				[routerLink]="cancelLink$ | async">
				<svg wGlyph="cancel"></svg> Cancel
			</button>

		</w-portal>

		<header class="mb-8 comp-title">Add Note</header>
		<app-note-form
			[parentId]="parentId$ | async"
			[nodes]="nodes()"
			[tagSuggestions]="(tagSuggestions$ | async) ?? []"
			(create)="onCreate($event)"
			(tagInput)="onTagInput($event)"></app-note-form>
	`,
	host: { 'class': 'comp p-4' }
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
