import { ChangeDetectionStrategy, Component, HostListener, Signal, WritableSignal, inject, signal } from '@angular/core';
import { Quote, onEnterFadeOutTrigger, quoteChangeTrigger } from '@lib';
import { Store } from '@ngrx/store';
import { setRunning } from 'store/actions/quote.actions';
import { selQuoteViewer_quote, selQuoteViewer_running } from 'store/selectors/quote-selectors/quote-viewer.selectors';
import { quoteHeightTrigger } from './quote-container.animation';

const picard: Quote = {

	id: 'dummyId',
	name: 'Seize the time… Live now. Make now always the most precious time. Now will never come again.',
	author: 'Capt. Jean-Luc Picard',
	context: 'Star Trek: The Next Generation - ‘The Inner Light’'

};

@Component({
	selector: 'app-quote-container',
	templateUrl: './quote-container.component.html',
	styleUrls: ['./quote-container.component.scss'],
	animations: [onEnterFadeOutTrigger, quoteHeightTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteContainerComponent {

	protected PICARD = picard;

	private store: Store = inject(Store);

	quote: Signal<Quote | null> = this.store.selectSignal(selQuoteViewer_quote);
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

}
