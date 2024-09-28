import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, Project } from 'lib';
import { entityActions } from 'store/actions';

@Component({
	selector: 'app-project-new-form-container',
	templateUrl: './project-new-form-container.component.html',
	styleUrls: ['./project-new-form-container.component.scss'],
	host: { 'class': 'd-flex-column' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectNewFormContainerComponent {

	private store: Store = inject(Store);

	onCreate(project: Partial<Project>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.project, entity: project }));

	}

}
