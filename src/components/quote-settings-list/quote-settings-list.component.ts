import { ChangeDetectionStrategy, Component, InputSignal, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UUID } from '@constants';
import { GlyphDirective, InputComponent } from '@libComponents';
import { Quote } from '@models';
import { fc } from '@utils';

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, GlyphDirective, InputComponent ],
	selector: 'app-quote-settings-list',
	templateUrl: './quote-settings-list.component.html',
	host: { 'class': 'flex flex-col comp' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSettingsListComponent {

	// Input
	quotes: InputSignal<Quote[]> = input.required();

	// Output
	select = output<UUID>();
	search = output<string>();

	// Form
	protected form: FormControl<string | null>;

	constructor() {

		this.form = fc('');
		this.form.valueChanges
			.pipe(
				takeUntilDestroyed()
			).subscribe(
				term => this.search.emit(term ?? '')
			);

	}

	onSelect(quote: Quote): void {

		this.select.emit(quote.id);

	}

}
