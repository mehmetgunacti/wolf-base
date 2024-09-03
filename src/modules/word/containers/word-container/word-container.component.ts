import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppEntityType, Definition, definitionName, QuizProgress, UUID, Word } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as entityActions from 'store/actions/entity.actions';
import { selWord_EntityIds } from 'store/selectors/entity-selectors/entity-word.selectors';
import { selWord_SelectedEntity } from 'store/selectors/word-selectors/word-ui.selectors';

@Component({
	selector: 'app-word-container',
	templateUrl: './word-container.component.html',
	styleUrls: ['./word-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordContainerComponent {

	private store: Store = inject(Store);

	word$: Observable<Word | null>;
	scheduledIds$: Observable<UUID[]>;

	constructor() {

		this.word$ = this.store.select(selWord_SelectedEntity);
		this.scheduledIds$ = this.store.select(selWord_EntityIds);

	}

	onRemove(id: UUID): void {

		if (confirm(`Word will be deleted. Continue?`))
			this.store.dispatch(entityActions.moveToTrash({ entityType: AppEntityType.word, id }));

	}

	onSchedule(definition: Definition): void {

		const entity: Partial<QuizProgress> = {

			id: definition.id,
			name: definitionName(definition)

		};
		this.store.dispatch(entityActions.create({ entityType: AppEntityType.quizEntry, entity }));

	}

	onCancelSchedule(definition: Definition): void {

		this.store.dispatch(entityActions.moveToTrash({ entityType: AppEntityType.quizEntry, id: definition.id })); //  entity: { id: definition.id, name: definitionName(definition)

	}

}
