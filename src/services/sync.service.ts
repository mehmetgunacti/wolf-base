import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { syncSetState } from 'store/sync/actions';
import { SyncEvent } from 'lib';

@Injectable({
	providedIn: 'root'
})
export class SyncService {

	private worker: Worker;
	private source = interval(1 * 60 * 60 * 1000); // every 6 hours
	private subscription = new Subscription();

	constructor(private store: Store) {

		this.worker = new Worker('./worker/sync.worker', { type: 'module' });
		console.log(this.worker);
		this.worker.onmessage = (event: MessageEvent<SyncEvent>) => {

			this.store.dispatch(syncSetState({ message: event.data }));

		};

	}

	trigger(): void {

		console.log('triggering from inside SyncService.trigger():');
		this.worker.postMessage({});

	}

	schedule(): void {

		// this.subscription.add(

		// 	this.source.subscribe(() => this.trigger())

		// );

	}

	suspend(): void {

		this.subscription.unsubscribe();

	}

}
