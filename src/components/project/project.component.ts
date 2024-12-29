import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { slideDownTrigger } from '@animations/slide-in-out.animation';
import { ProjectStatusLabels } from '@constants/project.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Project } from '@models/project.model';
import { TimePastPipe } from '@pipes/time-past.pipe';

@Component({
	imports: [ GlyphDirective, RouterLink, TimePastPipe, DatePipe ],
	selector: 'app-project',
	templateUrl: './project.component.html',
	animations: [ slideDownTrigger ],
	host: {
		'class': 'flex flex-col text-content'
	}
})
export class ProjectComponent extends BaseComponent {

	protected ProjectStatusLabels = ProjectStatusLabels;

	// Input
	project = input.required<Project>();
	expanded = input<boolean>(false);

	// Output
	toggleInfo = output<boolean>();

	onToggleInfo(): void {

		this.toggleInfo.emit(!this.expanded());

	}

}
