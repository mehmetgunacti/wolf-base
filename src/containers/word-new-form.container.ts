import { entityActions } from '@actions/entity.actions';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { WordForm } from '@forms/word/word.form';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Word } from '@models/word.model';
import { Store } from '@ngrx/store';

@Component({
	imports: [ PortalComponent, RouterLink, WordForm, GlyphDirective ],
	selector: 'app-word-new-form-container',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				[routerLink]="['/words']">
				<svg wGlyph="cancel"></svg> Cancel
			</button>

		</w-portal>

		<header class="mb-8 comp-title">Add Word</header>
		<app-word-form (create)="onCreate($event)"/>
	`,
	host: { 'class': 'comp p-2 md:p-4' }
})
export class WordNewFormContainer extends BaseComponent {

	private store: Store = inject(Store);

	onCreate(word: Partial<Word>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.word, entity: word }));

	}

}
