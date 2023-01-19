import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
	<ng-progress [thick]="false"
			 color="red"></ng-progress>
	<router-outlet></router-outlet>
	`
})
export class AppComponent {}
