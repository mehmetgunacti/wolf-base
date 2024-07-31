import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Definition, definitionName, UUID, Project } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as projectActions from 'store/actions/project.actions';
import { selQuizEntry_ids } from 'store/selectors/quiz-entry-selectors/quiz-entry-entities.selectors';
import { selProject_selected } from 'store/selectors/project-selectors/project-entities.selectors';
import { selProject_infoVisible } from 'store/selectors/project-selectors/project-ui.selectors';

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
	infoVisible: Signal<boolean>;

	constructor() {

		this.project$ = this.store.select(selProject_selected);
		this.scheduledIds$ = this.store.select(selQuizEntry_ids);
		this.infoVisible = this.store.selectSignal(selProject_infoVisible);

	}

	onToggleInfo(): void {

		this.store.dispatch(projectActions.toggleInfo());

	}

	onOpenNewTaskDialog(): void {

		this.store.dispatch(projectActions.openNewTaskDialog());

	}

}
