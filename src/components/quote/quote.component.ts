import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GlyphDirective } from 'lib/components/glyph/glyph.directive';

@Component({
	selector: 'app-quote',
	standalone: true,
	imports: [ GlyphDirective ],
	templateUrl: './quote.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent {



}
