import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-settings-page',
	standalone: true,
	imports: [],
	templateUrl: './settings-page.component.html',
	styleUrl: './settings-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {

}
