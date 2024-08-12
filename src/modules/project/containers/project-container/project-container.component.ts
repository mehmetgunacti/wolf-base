import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Project, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as taskActions from 'store/actions/project-task.actions';
import * as projectActions from 'store/actions/project.actions';
import { selProject_infoVisible, selProject_selected } from 'store/selectors/project-selectors/project-ui.selectors';

@Component({
	selector: 'app-project-container',
	templateUrl: './project-container.component.html',
	styleUrls: ['./project-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent {

	private store: Store = inject(Store);

	project$: Observable<Project | null>;
	infoVisible: Signal<boolean>;

	constructor() {

		this.project$ = this.store.select(selProject_selected);
		this.infoVisible = this.store.selectSignal(selProject_infoVisible);

	}

	onToggleInfo(): void {

		this.store.dispatch(projectActions.toggleInfo());

	}

	onOpenNewTaskDialog(): void {

		this.store.dispatch(taskActions.openAddTaskDialog());

	}

	onViewTaskDialog(id: UUID): void {

		this.store.dispatch(taskActions.openTaskDialog({ id }));

	}

}
