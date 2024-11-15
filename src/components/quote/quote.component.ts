import { Component, input } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';
import { Quote } from '@models/quote.model';

@Component({
	selector: 'app-quote',
	standalone: true,
	imports: [],
	templateUrl: './quote.component.html',
	host: {
		'class': 'absolute inset-3 md:inset-4 grid overflow-y-auto scrollbar scrollbar-dark'
	}
})
export class QuoteComponent extends BaseComponent {

	quote = input.required<Quote>();

}
