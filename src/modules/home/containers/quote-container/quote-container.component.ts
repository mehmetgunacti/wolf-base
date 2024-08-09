import { ChangeDetectionStrategy, Component, HostListener, Signal, WritableSignal, inject, signal } from '@angular/core';
import { PICARD, Quote, onEnterFadeOutTrigger } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, concatMap, filter, map, scan, startWith, take, timer } from 'rxjs';
import { disableAnimation, setRunning } from 'store/actions/quote.actions';
import { selQuoteViewer_animate, selQuoteViewer_quote, selQuoteViewer_running } from 'store/selectors/quote-selectors/quote-viewer.selectors';

interface Pair {

	prev: Quote | null;
	curr: Quote | null;

}

interface QuoteWrapper {

	value: Quote;
	outgoing: boolean;

}

function inOrOut(pair: Pair, isPrevious: boolean): QuoteWrapper | null {

	if (isPrevious) {

		if (pair.prev === null)
			return null;
		return { value: pair.prev, outgoing: true };

	}
	if (pair.curr === null)
		return null;
	return { value: pair.curr, outgoing: false };

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
		startWith(PICARD),
		scan(

			(acc, curr) => ({ prev: acc.curr, curr }),
			{ prev: null, curr: null } as Pair

		),
		concatMap(

			pair => timer(0, 1500).pipe(

				take(2),
				map(t => inOrOut(pair, t === 0)),
				filter((wrapper): wrapper is QuoteWrapper => wrapper !== null)

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
