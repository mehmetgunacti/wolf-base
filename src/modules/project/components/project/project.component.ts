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

	// @Input
	project: InputSignal<Project> = input.required();
	expanded: InputSignal<boolean> = input(false);

	// @Output
	toggleInfo = output<boolean>();

	onToggleInfo(): void {

		this.toggleInfo.emit(!this.expanded());

	}

}
