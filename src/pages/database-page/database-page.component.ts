import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-database-page',
	standalone: true,
	imports: [],
	templateUrl: './database-page.component.html',
	styleUrl: './database-page.component.scss',
	host: {
		'class': 'page'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabasePageComponent {

}
