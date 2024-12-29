import { settingsActions } from '@actions/settings.actions';
import { Component, inject } from '@angular/core';
import { FirestoreConfigForm } from '@forms/firestore-config/firestore-config.form';
import { BaseComponent } from '@libComponents/base.component';
import { FirestoreConfig } from '@models/configuration.model';
import { Store } from '@ngrx/store';
import { selCore_firestoreConfig } from '@selectors/core/core-configuration.selectors';

@Component({
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
