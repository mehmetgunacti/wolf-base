import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'projects-page',
	standalone: true,
	imports: [],
	template: `
		<p>projects-page works!</p>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPage { }
