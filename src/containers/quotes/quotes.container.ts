import { quoteActions } from '@actions/quote.actions';
import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, Signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { QuoteComponent } from '@components/quote/quote.component';
import { BaseComponent } from '@libComponents/base.component';
import { Quote } from '@models/quote.model';
import { Store } from '@ngrx/store';
import { selQuote_SelectedEntity, selQuoteViewer_animate, selQuoteViewer_running } from '@selectors/quote/quote-viewer.selectors';
import { nnfc } from '@utils/form.util';
import { concatMap, filter, iif, Observable, of, scan, switchMap, take, tap, timer } from 'rxjs';
import { SwitchComponent } from "../../lib/components/switch/switch.component";

interface Pair {

	prev: Quote | null;
	curr: Quote | null;

}

interface QuoteWrapper {

	value: Quote;
	animClass: 'incoming' | 'outgoing' | 'noAnim';

}

const incoming = (value: Quote, animate: boolean): QuoteWrapper => ({ value, animClass: animate ? 'incoming' : 'noAnim' });
const outgoing = (value: Quote): QuoteWrapper => ({ value, animClass: 'outgoing' });

const incoming$ = (pair: Pair, animate: boolean, store: Store): Observable<QuoteWrapper> => {

	return of(incoming(pair.curr!, animate)).pipe(tap(() => store.dispatch(quoteActions.disableAnimation())));

};

@Component({
	imports: [ QuoteComponent, AsyncPipe, SwitchComponent, ReactiveFormsModule ],
	selector: 'app-quotes-container',
	templateUrl: './quotes.container.html',
	host: {
		'class': 'relative block min-h-40 text-content @container group'
	}
})
export class QuoteContainer extends BaseComponent {

	private store: Store = inject(Store);
	private running: Signal<boolean> = this.store.selectSignal(selQuoteViewer_running);

	protected animate: Signal<boolean> = this.store.selectSignal(selQuoteViewer_animate);
	protected fc = nnfc<boolean>(false);

	protected wrapper$: Observable<QuoteWrapper> = this.store.select(selQuote_SelectedEntity).pipe(

		filter((quote): quote is Quote => !!quote),
		scan(

			(acc, curr) => ({ prev: acc.curr, curr }),
			{ prev: null, curr: null } as Pair

		),
		concatMap(

			pair => iif(

				() => pair.prev === null,
				incoming$(pair, this.animate(), this.store),
				timer(0, 800).pipe(

					take(2),
					switchMap(

						t => iif(

							() => t === 0,
							of(outgoing(pair.prev!)),
							incoming$(pair, this.animate(), this.store)

						)

					)

				)

			)

		)

	);

	constructor() {

		super();
		effect(() => {

			const running = this.running();
			untracked(() => this.fc.setValue(running, { emitEvent: false }));

		});
		this.fc.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(
				running => this.store.dispatch(quoteActions.setRunning({ running }))
			);

	}

}
