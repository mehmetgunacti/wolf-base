import { Component, effect, input, output, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { GlyphDirective } from '@directives';
import { fc } from '@utils';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { BaseComponent } from '../base.component';
import { InputComponent } from '../input/input.component';

@Component({
	standalone: true,
	imports: [ GlyphDirective, InputComponent, ReactiveFormsModule ],
	selector: 'w-search-box',
	templateUrl: './search-box.component.html',
	host: {
		'class': 'flex items-center gap-1 comp comp-dark py-3 px-4 min-h-14'
	}
})
export class SearchBoxComponent extends BaseComponent {

	// Input
	term = input<string>('');

	// Output
	search = output<string>();

	protected fcSearch = fc<string | null>('');

	constructor() {

		super();
		effect(() => {

			const searchTerm = this.term();
			untracked(
				() => this.fcSearch.setValue(searchTerm, { emitEvent: false })
			);

		});

		this.fcSearch.valueChanges.pipe(

			takeUntilDestroyed(),
			filter((val): val is string => val !== null),
			debounceTime(400),
			distinctUntilChanged()


		).subscribe(val => this.search.emit(val));

	}

}
