import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirestoreConfig } from 'lib';
import { Observable } from 'rxjs';
import { saveFirestoreConfig } from 'store/actions/settings.actions';
import * as fromCore from 'store/selectors/core-configuration.selectors';

@Component({
	selector: 'app-firestore-config-container',
	templateUrl: './firestore-config-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirestoreConfigContainerComponent {

	private store: Store = inject(Store);

	config$: Observable<FirestoreConfig | null>;

	constructor() {

		this.config$ = this.store.select(fromCore.firestoreConfig);

	}

	onSave(config: FirestoreConfig): void {

		this.store.dispatch(saveFirestoreConfig({ config }));

	}

}
