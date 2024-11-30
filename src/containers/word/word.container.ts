import { entityActions } from '@actions/entity.actions';
import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordComponent } from '@components/word/word.component';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { QuizEntry } from '@models/quiz.model';
import { Definition, definitionName } from '@models/word.model';
import { Store } from '@ngrx/store';
import { selQuizEntry_EntityIds } from '@selectors/entity/entity-quiz-entry.selectors';
import { selWord_SelectedEntity } from '@selectors/word/word-ui.selectors';

@Component({
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, CdkMenuModule, RouterLink, WordComponent ],
	selector: 'app-word-container',
	templateUrl: './word.container.html',
	host: { 'class': 'flex flex-col gap-1 md:gap-2' }
})
export class WordContainer extends BaseComponent {

	private store: Store = inject(Store);

	word = this.store.selectSignal(selWord_SelectedEntity);
	scheduledIds = this.store.selectSignal(selQuizEntry_EntityIds);

	onRemove(id: UUID): void {

		if (confirm(`Word will be deleted. Continue?`))
			this.store.dispatch(entityActions.moveToTrash({ entityType: AppEntityType.word, id }));

	}

	onSchedule(definition: Definition): void {

		const entity: Partial<QuizEntry> = {

			id: definition.id,
			name: definitionName(definition)

		};
		this.store.dispatch(entityActions.create({ entityType: AppEntityType.quizEntry, entity }));

	}

	onCancelSchedule(definition: Definition): void {

		this.store.dispatch(entityActions.moveToTrash({ entityType: AppEntityType.quizEntry, id: definition.id })); //  entity: { id: definition.id, name: definitionName(definition)

	}

}
