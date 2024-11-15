import { settingsActions } from '@actions';
import { Component, inject } from '@angular/core';
import { FirestoreConfigForm } from '@forms/firestore-config/firestore-config.form';
import { BaseComponent } from '@libComponents';
import { FirestoreConfig } from '@models';
import { Store } from '@ngrx/store';
import { selCore_firestoreConfig } from '@selectors';

@Component({
	standalone: true,
	imports: [ FirestoreConfigForm ],
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
