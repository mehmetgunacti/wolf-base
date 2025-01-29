import { Component } from '@angular/core';
import { DatabaseContainer } from '@containers/database/database.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	selector: 'database-entities-page',
	imports: [ DatabaseContainer ],
	template: `
		<app-database-container/>
	`,
	host: { 'class': 'page' }
})
export class DatabaseEntitiesPage extends BaseComponent { }
