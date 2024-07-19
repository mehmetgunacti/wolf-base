import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Project } from '@lib';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {

	project: InputSignal<Project> = input.required();

}
