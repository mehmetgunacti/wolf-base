import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';
import { Project, ProjectStatusLabels, slideDownTrigger } from '@lib';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
	animations: [slideDownTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {

	protected ProjectStatusLabels = ProjectStatusLabels;

	project: InputSignal<Project> = input.required();
	infoVisible: InputSignal<boolean> = input(false);

	toggleInfo = output<boolean>();

	toggle(): void {

		this.toggleInfo.emit(!this.infoVisible());

	}

}
