import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-project-page',
	templateUrl: './project-page.component.html',
	styleUrls: ['./project-page.component.scss'],
	host: { 'class': 'd-flex-column' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectPageComponent { }
