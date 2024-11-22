import { entityActions } from '@actions/entity.actions';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { WordFormComponent } from '@forms/word/word.form';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Word } from '@models/word.model';
import { Store } from '@ngrx/store';
import { selWord_SelectedEntity } from '@selectors/word/word-ui.selectors';

@Component({
	standalone: true,
	imports: [ PortalComponent, RouterLink, WordFormComponent, GlyphDirective ],
	selector: 'app-word-edit-form-container',
	template: `
		@if(word(); as word) {

			<w-portal>

				<button
					class="btn btn-ghost"
					[routerLink]="['/words', word.id ]">
					<svg wGlyph="cancel"></svg> Cancel
				</button>

			</w-portal>

			<app-word-form [word]="word" (update)="onUpdate($event.id, $event.word)"/>

		}
	`
})
export class WordEditFormContainer extends BaseComponent {

	private store: Store = inject(Store);

	word = this.store.selectSignal(selWord_SelectedEntity);

	onUpdate(id: UUID, word: Partial<Word>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.word, id, entity: word }));

	}

}
