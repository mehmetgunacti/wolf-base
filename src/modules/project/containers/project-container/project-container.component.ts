import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Definition, definitionName, UUID, Project } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as projectActions from 'store/actions/project.actions';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';
import { selQuizEntry_ids } from 'store/selectors/quiz-entry-selectors/quiz-entry-entities.selectors';
import { selProject_selected } from 'store/selectors/project-selectors/project-entities.selectors';

@Component({
	selector: 'app-project-container',
	templateUrl: './project-container.component.html',
	styleUrls: ['./project-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent {

	private store: Store = inject(Store);

	project$: Observable<Project | null>;
	scheduledIds$: Observable<UUID[]>;

	constructor() {

		this.project$ = this.store.select(selProject_selected);
		this.scheduledIds$ = this.store.select(selQuizEntry_ids);

	}

	onRemove(id: UUID): void {

		if (confirm(`Project will be deleted. Continue?`))
			this.store.dispatch(projectActions.moveToTrash({ id }));

	}

	onSchedule(definition: Definition): void {

		this.store.dispatch(quizEntryActions.create({ definition }));

	}

	onCancelSchedule(definition: Definition): void {

		this.store.dispatch(quizEntryActions.moveToTrash({ entry: { id: definition.id, name: definitionName(definition) } }));

	}

}
