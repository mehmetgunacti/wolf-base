import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, filter } from 'rxjs';

@Component({
	selector: 'app-learning-filter',
	templateUrl: './learning-filter.component.html',
	styleUrls: ['./learning-filter.component.scss'],
	host: { 'class': 'd-flex gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningFilterComponent implements OnDestroy {

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
