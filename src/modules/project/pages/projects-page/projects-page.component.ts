import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-projects-page',
	templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
	host: { 'class': 'd-flex-column gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent { }
