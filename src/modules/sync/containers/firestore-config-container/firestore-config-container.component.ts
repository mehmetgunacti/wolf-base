import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirestoreConfig } from 'lib';
import { Observable } from 'rxjs';
import * as fromCore from 'store/core';
import * as fromSync from 'store/sync';

@Component({
	selector: 'app-firestore-config-container',
	templateUrl: './firestore-config-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirestoreConfigContainerComponent {

	private store: Store = inject(Store);

	config$: Observable<FirestoreConfig>;

	constructor() {

		this.config$ = this.store.select(fromCore.getFirestoreConfig);

	}

	onSave(config: FirestoreConfig): void {

		this.store.dispatch(fromCore.saveFirestoreConfig({ config }));

	}

	onCancel(): void {

		this.store.dispatch(fromSync.closeFirestoreDialog());

	}

}
