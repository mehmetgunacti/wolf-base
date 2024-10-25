import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-projects-page',
	standalone: true,
	imports: [],
	templateUrl: './projects-page.component.html',
	styleUrl: './projects-page.component.scss',
	host: {
		'class': 'page'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent {

}
