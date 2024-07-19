import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from 'lib';
import { create } from 'store/actions/project.actions';

@Component({
	selector: 'app-project-new-form-container',
	templateUrl: './project-new-form-container.component.html',
	styleUrls: ['./project-new-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectNewFormContainerComponent {

	private store: Store = inject(Store);

	onCreate(project: Partial<Project>): void {

		this.store.dispatch(create({ project }));

	}

}
