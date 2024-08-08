import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Quote } from '@lib';

@Component({
	selector: 'app-quote',
	templateUrl: './quote.component.html',
	styleUrl: './quote.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent {

	quote: InputSignal<Quote> = input.required();

}
