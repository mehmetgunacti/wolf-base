import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirestoreConfig } from 'lib';
import { Observable } from 'rxjs';
import { saveFirestoreConfig } from 'store/actions/settings.actions';
import { selCore_firestoreConfig } from 'store/selectors/core/core-configuration.selectors';

@Component({
	selector: 'app-firestore-config-container',
	templateUrl: './firestore-config-container.component.html',
	styleUrls: ['./firestore-config-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirestoreConfigContainerComponent {

	private store: Store = inject(Store);

	config$: Observable<FirestoreConfig | null>;

	constructor() {

		this.config$ = this.store.select(selCore_firestoreConfig);

	}

	onSave(config: FirestoreConfig): void {

		this.store.dispatch(saveFirestoreConfig({ config }));

	}

}
