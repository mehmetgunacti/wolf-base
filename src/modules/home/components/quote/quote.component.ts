import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Quote } from '@lib';

@Component({
	selector: 'app-quote',
	templateUrl: './quote.component.html',
	styleUrl: './quote.component.scss',
	host: { 'class': 'd-flex-column' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent {

	quote: InputSignal<Quote> = input.required();

}
