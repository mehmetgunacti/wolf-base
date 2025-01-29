import { Component } from '@angular/core';
import { DatabaseEntitiesSearchContainer } from '@containers/database-entities-search.container';
import { DatabaseEntitiesContainer } from '@containers/database-entities/database-entities.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	selector: 'database-entities-page',
	imports: [ DatabaseEntitiesContainer, DatabaseEntitiesSearchContainer ],
	template: `
		<app-database-entities-search-container/>
		<app-database-entities-container/>
	`,
	host: { 'class': 'page' }
})
export class DatabaseEntitiesPage extends BaseComponent { }
