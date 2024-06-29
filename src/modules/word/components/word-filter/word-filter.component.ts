import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, filter } from 'rxjs';

@Component({
	selector: 'app-word-filter',
	templateUrl: './word-filter.component.html',
	styleUrls: ['./word-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordFilterComponent implements OnDestroy {

	fcSearch = new FormControl('');
	subscription: Subscription = new Subscription();

	@Input() set term(term: string | null) {

		this.fcSearch.setValue(term, { emitEvent: false });

	}
	@Output() search: EventEmitter<string> = new EventEmitter();

	constructor() {

		// search by term
		this.subscription.add(

			this.fcSearch.valueChanges.pipe(
				filter((val): val is string => val !== null)
			).subscribe(val => this.search.emit(val))

		);

	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}
