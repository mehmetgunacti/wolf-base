import { Component, InputSignal, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { BaseComponent } from '@libComponents/base.component';
import { InputComponent } from '@libComponents/input/input.component';
import { Quote } from '@models/quote.model';
import { fc } from '@utils/form.util';

@Component({
	imports: [ ReactiveFormsModule, InputComponent ],
	selector: 'app-quote-settings-list',
	templateUrl: './quote-settings-list.component.html',
	host: { 'class': 'flex flex-col' }
})
export class QuoteSettingsListComponent extends BaseComponent {

	// Input
	quotes: InputSignal<Quote[]> = input.required();

	// Output
	select = output<UUID>();
	search = output<string>();

	// Form
	protected form: FormControl<string | null>;

	constructor() {

		super();
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
