import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { backupDatabase } from 'store/actions/database.actions';

@Component({
	selector: 'app-database-page',
	templateUrl: './database-page.component.html',
	styleUrls: ['./database-page.component.scss']
})
export class DatabasePageComponent {

	private store: Store = inject(Store);

	onBackupDatabase(): void {

		this.store.dispatch(backupDatabase());

	}

}
