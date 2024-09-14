import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-project-edit-form-page',
	templateUrl: './project-form-edit-page.component.html',
	styleUrls: ['./project-form-edit-page.component.scss'],
	host: { 'class': 'd-flex-column' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectEditFormPageComponent { }
