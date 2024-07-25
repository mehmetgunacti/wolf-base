import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Project, PROJECT_STATUS, ProjectStatusLabels } from '@lib';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {

	protected ProjectStatusLabels = ProjectStatusLabels;

	project: InputSignal<Project> = input.required();

}
