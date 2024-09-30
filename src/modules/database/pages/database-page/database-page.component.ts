import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { databaseActions } from 'store/actions';

@Component({
	selector: 'app-database-page',
	templateUrl: './database-page.component.html',
	styleUrls: ['./database-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabasePageComponent {

	private store: Store = inject(Store);

	onBackupDatabase(): void {

		this.store.dispatch(databaseActions.backupDatabase());

	}

}
