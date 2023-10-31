import { Component } from '@angular/core';
import { buildInfo } from 'version';

@Component({
	selector: 'app-settings-page',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {

	builtTime = buildInfo.builtTime;
	builtVersion = buildInfo.version;
	builtNumber = buildInfo.builtNumber;

}
