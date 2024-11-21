import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';
import { CloudTasksContainer } from "../containers/cloud-tasks/cloud-tasks.container";

@Component({
	standalone: true,
	imports: [CloudTasksContainer],
	selector: 'cloud-page',
	template: `<app-cloud-tasks-container/>`,
	host: { 'class': 'page' }
})
export class CloudPage extends BaseComponent { }
