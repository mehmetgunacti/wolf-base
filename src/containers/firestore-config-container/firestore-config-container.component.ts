import { settingsActions } from '@actions';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirestoreConfig } from '@models';
import { Store } from '@ngrx/store';
import { selCore_firestoreConfig } from '@selectors';
import { FirestoreConfigFormComponent } from 'components/firestore-config-form';

@Component({
	standalone: true,
	imports: [ FirestoreConfigFormComponent ],
	selector: 'app-firestore-config-container',
	templateUrl: './firestore-config-container.component.html',
	host: { 'class': 'comp p-4' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirestoreConfigContainerComponent {

	private store: Store = inject(Store);

	protected config = this.store.selectSignal(selCore_firestoreConfig);

	onSave(config: FirestoreConfig): void {

		this.store.dispatch(settingsActions.saveFirestoreConfig({ config }));

	}

}
