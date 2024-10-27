import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Quote } from '@models';
import { GlyphDirective } from 'lib/components/glyph/glyph.directive';

@Component({
	selector: 'app-quote',
	standalone: true,
	imports: [ GlyphDirective ],
	templateUrl: './quote.component.html',
	host: {
		'class': 'absolute inset-3 md:inset-4 grid overflow-y-auto scrollbar scrollbar-dark'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent {

	quote = input.required<Quote>();

}
