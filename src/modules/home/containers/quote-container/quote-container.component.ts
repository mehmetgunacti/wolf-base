import { ChangeDetectionStrategy, Component, HostListener, Signal, WritableSignal, inject, signal } from '@angular/core';
import { Quote, onEnterFadeOutTrigger } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, concatMap, filter, iif, map, of, scan, take, timer } from 'rxjs';
import { disableAnimation, setRunning } from 'store/actions/quote.actions';
import { selQuoteViewer_animate, selQuoteViewer_quote, selQuoteViewer_running } from 'store/selectors/quote-selectors/quote-viewer.selectors';

interface Pair {

	prev: Quote | null;
	curr: Quote | null;

}

const incoming = (value: Quote): QuoteWrapper => ({ value, clazz: 'incoming' });
const outgoing = (value: Quote): QuoteWrapper => ({ value, clazz: 'outgoing' });

interface QuoteWrapper {

	value: Quote;
	clazz: 'outgoing' | 'incoming' | null;

}

@Component({
	selector: 'app-quote-container',
	templateUrl: './quote-container.component.html',
	styleUrls: ['./quote-container.component.scss'],
	animations: [onEnterFadeOutTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteContainerComponent {

	private store: Store = inject(Store);

	wrapper$: Observable<QuoteWrapper> = this.store.select(selQuoteViewer_quote).pipe(

		filter((quote): quote is Quote => !!quote),
		scan(

			(acc, curr) => ({ prev: acc.curr, curr }),
			{ prev: null, curr: null } as Pair

		),
		concatMap(

			pair => iif(

				() => pair.prev === null,
				of(incoming(pair.curr!)),
				timer(0, 1500).pipe(

					take(2),
					map(t => t === 0 ? outgoing(pair.prev!) : incoming(pair.curr!))

				)

			)

		)

	);

	animate: Signal<boolean> = this.store.selectSignal(selQuoteViewer_animate);
	running: Signal<boolean> = this.store.selectSignal(selQuoteViewer_running);
	showPlay: WritableSignal<boolean> = signal(false);

	@HostListener('click')
	setRunning(): void {

		const running = this.running();
		if (!running) { // show play icon for 2,5 seconds

			this.showPlay.set(true); // fades out 2s (css class 'play')
			setTimeout(() => this.showPlay.set(false), 2500);

		}
		this.store.dispatch(setRunning({ running: !this.running() }));

	}

	onAnimationEnd(): void {

		this.store.dispatch(disableAnimation());

	}

}
