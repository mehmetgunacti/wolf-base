import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-logs-page',
	standalone: true,
	imports: [],
	templateUrl: './logs-page.component.html',
	styleUrl: './logs-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsPageComponent {

}
