import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-project-new-form-page',
	templateUrl: './project-new-form-page.component.html',
	styleUrls: ['./project-new-form-page.component.scss'],
	host: { 'class': 'd-flex-column' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectNewFormPageComponent { }
