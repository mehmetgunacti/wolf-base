import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Quote, onEnterFadeOutTrigger, quoteChangeTrigger } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, iif, map, of, switchMap, tap, timer } from 'rxjs';
import { setQuotesRunning } from 'store/actions/core-ui.actions';
import { selCore_quotesRunning } from 'store/selectors/core-ui.selectors';
import { selQuote_array } from 'store/selectors/quote-selectors/quote-entities.selectors';

const picard: Quote = {

	id: 'dummyId',
	name: 'Seize the time… Live now. Make now always the most precious time. Now will never come again.',
	author: 'Capt. Jean-Luc Picard',
	context: 'Star Trek: The Next Generation - The Inner Light'

};

@Component({
	selector: 'app-quote-viewer',
	templateUrl: './quote-viewer.component.html',
	styleUrls: ['./quote-viewer.component.scss'],
	animations: [onEnterFadeOutTrigger, quoteChangeTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteViewerComponent {

	private store: Store = inject(Store);

	running$: Observable<boolean>;
	quote$: Observable<Quote | null>;
	timer$: Observable<number>;

	constructor() {

		this.timer$ = timer(0, 60 * 1000); // 1 min

		const selected$: Observable<Quote | null> = this.timer$.pipe(

			switchMap(() =>

				this.store.select(selQuote_array).pipe(
					map(list => list[Math.floor(Math.random() * list.length)])
				)

			)

		);

		this.running$ = this.store.select(selCore_quotesRunning);
		this.quote$ = this.running$.pipe(

			switchMap(running => iif(

				() => running,
				selected$,
				of(picard)

			))

		);

	}

	setRunning(running: boolean): void {

		this.store.dispatch(setQuotesRunning({ running }));

	}

}
