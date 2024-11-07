import { databaseActions } from '@actions';
import { Component, inject } from '@angular/core';
import { BaseComponent, PortalComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import { DatabaseContainer } from "../containers/database/database.container";
import { GlyphDirective } from '@directives';

@Component({
	selector: 'database-page',
	standalone: true,
	imports: [ PortalComponent, DatabaseContainer, GlyphDirective ],
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				(click)="onBackupDatabase()">
				<svg wGlyph="system_update_alt"></svg> Export
			</button>

		</w-portal>

		<app-database-container/>
	`,
	host: { 'class': 'page' }
})
export class DatabasePage extends BaseComponent {

	private store = inject(Store);

	onBackupDatabase(): void {

		this.store.dispatch(databaseActions.backupDatabase());

	}

}
