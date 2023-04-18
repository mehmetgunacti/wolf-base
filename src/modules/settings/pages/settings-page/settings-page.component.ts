import { Component } from '@angular/core';
import { WolfBaseTableName } from 'lib';

@Component({
	selector: 'app-settings-page',
	templateUrl: './settings-page.component.html'
})
export class SettingsPageComponent {

	tableNames: { label: string, value: string }[];

	constructor() {

		this.tableNames = Object.entries(WolfBaseTableName).map(([value, label]) => ({ label, value }));

	}

}