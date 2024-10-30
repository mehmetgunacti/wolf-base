import { settingsActions } from '@actions';
import { Component, inject } from '@angular/core';
import { BaseComponent } from '@libComponents';
import { FirestoreConfig } from '@models';
import { Store } from '@ngrx/store';
import { selCore_firestoreConfig } from '@selectors';
import { FirestoreConfigFormComponent } from 'components/firestore-config-form';

@Component({
	standalone: true,
	imports: [ FirestoreConfigFormComponent ],
	selector: 'app-firestore-config-container',
	templateUrl: './firestore-config.container.html',
	host: { 'class': 'comp p-4' }
})
export class FirestoreConfigContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected config = this.store.selectSignal(selCore_firestoreConfig);

	onSave(config: FirestoreConfig): void {

		this.store.dispatch(settingsActions.saveFirestoreConfig({ config }));

	}

}
