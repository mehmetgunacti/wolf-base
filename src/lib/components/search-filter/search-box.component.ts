import { ChangeDetectionStrategy, Component, effect, input, output, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { GlyphDirective } from '../glyph/glyph.directive';
import { InputComponent } from '../input/input.component';

@Component({
	selector: 'w-search-box',
	standalone: true,
	imports: [GlyphDirective, InputComponent, ReactiveFormsModule],
	templateUrl: './search-box.component.html',
	styleUrls: ['./search-box.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent {

	protected fcSearch = new FormControl('');

	subscription: Subscription = new Subscription();

	// Input
	term = input.required<string | null>();

	// Output
	search = output<string>();

	constructor() {

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


		).subscribe(val => this.search.emit(val))

	}

}
