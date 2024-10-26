import { quoteActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { QuoteComponent } from '@components';
import { GlyphDirective } from '@libComponents';
import { Quote } from '@models';
import { Store } from '@ngrx/store';
import { selQuote_SelectedEntity, selQuoteViewer_animate, selQuoteViewer_running } from '@selectors';
import { concatMap, filter, iif, Observable, of, scan, switchMap, take, tap, timer } from 'rxjs';

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
	selector: 'app-quotes-container',
	standalone: true,
	imports: [ QuoteComponent, GlyphDirective, AsyncPipe ],
	templateUrl: './quotes-container.component.html',
	host: {
		'class': 'relative flex flex-col gap-1 md:gap-2 shadow-component comp-dark p-2 rounded-lg min-h-40 text-content @container'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteContainerComponent {

	private store: Store = inject(Store);

	constructor() {

		this.store.dispatch(quoteActions.setRunning({running: true}));

	}

	animate: Signal<boolean> = this.store.selectSignal(selQuoteViewer_animate);
	running: Signal<boolean> = this.store.selectSignal(selQuoteViewer_running);
	showPlay: WritableSignal<boolean> = signal(false);

	wrapper$: Observable<QuoteWrapper> = this.store.select(selQuote_SelectedEntity).pipe(

		tap(a => console.log(a)),
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

}
