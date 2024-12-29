import { entityActions } from '@actions/entity.actions';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { WordForm } from '@forms/word/word.form';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Word } from '@models/word.model';
import { Store } from '@ngrx/store';
import { selWord_SelectedEntity } from '@selectors/word/word-ui.selectors';

@Component({
	imports: [ PortalComponent, RouterLink, WordForm, GlyphDirective ],
	selector: 'app-word-edit-form-container',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				[routerLink]="['/words', word()?.id ]">
				<svg wGlyph="cancel"></svg> Cancel
			</button>

		</w-portal>

		<header class="mb-8 comp-title">Edit Word</header>
		<app-word-form [word]="word()" (update)="onUpdate($event.id, $event.word)"/>
	`,
	host: { 'class': 'comp p-4' }
})
export class WordEditFormContainer extends BaseComponent {

	private store: Store = inject(Store);

	word = this.store.selectSignal(selWord_SelectedEntity);

	onUpdate(id: UUID, word: Partial<Word>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.word, id, entity: word }));

	}

}
