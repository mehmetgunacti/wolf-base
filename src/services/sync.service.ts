import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SyncEvent } from 'lib';
import { interval, Subscription } from 'rxjs';
import { syncEvent } from 'store/actions/sync.actions';

@Injectable({
	providedIn: 'root'
})
export class SyncService {

	private worker: Worker;
	private source = interval(1 * 60 * 60 * 1000); // every 6 hours
	private subscription = new Subscription();

	constructor(private store: Store) {

		// this.worker = new Worker('../worker/sync1.worker', { type: 'module' });
		this.worker = new Worker(new URL('../worker/sync.worker', import.meta.url));
		this.worker.onmessage = (event: MessageEvent<SyncEvent>) => {

			console.log('Incoming from worker: ', event.data);
			this.store.dispatch(syncEvent(event.data));

		};

	}

	trigger(): void {

		// console.log('triggering from inside SyncService.trigger():');
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
