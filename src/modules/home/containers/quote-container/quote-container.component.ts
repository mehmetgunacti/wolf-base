import { ChangeDetectionStrategy, Component, HostListener, Signal, WritableSignal, inject, signal } from '@angular/core';
import { Quote, onEnterFadeOutTrigger } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, concatMap, filter, iif, of, scan, switchMap, take, tap, timer } from 'rxjs';
import { quoteActions } from 'store/actions';
import { selQuoteViewer_animate, selQuoteViewer_running, selQuote_SelectedEntity } from 'store/selectors/quote/quote-viewer.selectors';

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

}

@Component({
	selector: 'app-quote-container',
	templateUrl: './quote-container.component.html',
	styleUrls: ['./quote-container.component.scss'],
	animations: [onEnterFadeOutTrigger],
	host: { 'class': 'box shadow dark d-flex-column jc-center pos-relative cur-pointer' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteContainerComponent {

	private store: Store = inject(Store);

	animate: Signal<boolean> = this.store.selectSignal(selQuoteViewer_animate);
	running: Signal<boolean> = this.store.selectSignal(selQuoteViewer_running);
	showPlay: WritableSignal<boolean> = signal(false);

	wrapper$: Observable<QuoteWrapper> = this.store.select(selQuote_SelectedEntity).pipe(

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

	@HostListener('click')
	setRunning(): void {

		const running = this.running();
		if (!running) { // show play icon for 2,5 seconds

			this.showPlay.set(true); // fades out 2s (css class 'play')
			setTimeout(() => this.showPlay.set(false), 2500);

		}
		this.store.dispatch(quoteActions.setRunning({ running: !this.running() }));

	}

}
