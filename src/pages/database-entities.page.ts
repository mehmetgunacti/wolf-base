import { Component } from '@angular/core';
import { DatabaseEntitiesContainer } from '@containers/database-entities/database-entities.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	selector: 'database-entities-page',
	imports: [DatabaseEntitiesContainer],
	template: `
		<app-database-entities-container/>
	`,
	host: { 'class': 'page' }
})
export class DatabaseEntitiesPage extends BaseComponent { }
