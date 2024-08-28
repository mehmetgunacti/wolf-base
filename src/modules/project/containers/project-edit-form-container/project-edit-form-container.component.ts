import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, Project, UUID } from 'lib';
import { Observable } from 'rxjs';
import * as entityActions from 'store/actions/entity.actions';
import { selProject_selected } from 'store/selectors/project-selectors/project-ui.selectors';

@Component({
	selector: 'app-project-edit-form-container',
	templateUrl: './project-edit-form-container.component.html',
	styleUrls: ['./project-edit-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectEditFormContainerComponent {

	private store: Store = inject(Store);

	project$: Observable<Project | null | undefined>;

	constructor() {

		this.project$ = this.store.select(selProject_selected);

	}

	onUpdate(id: UUID, project: Partial<Project>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.project, id, entity: project }));

	}

}
