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
	standalone: true,
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

		<app-word-form (create)="onCreate($event)"/>
	`
})
export class WordNewFormContainer extends BaseComponent {

	private store: Store = inject(Store);

	onCreate(word: Partial<Word>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.word, entity: word }));

	}

}
