import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-cloud-page',
	standalone: true,
	imports: [],
	templateUrl: './cloud-page.component.html',
	styleUrl: './cloud-page.component.scss',
	host: {
		'class': 'page'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudPageComponent {

}
