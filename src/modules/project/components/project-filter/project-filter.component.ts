import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, filter } from 'rxjs';

@Component({
	selector: 'app-project-filter',
	templateUrl: './project-filter.component.html',
	styleUrls: ['./project-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFilterComponent implements OnDestroy {

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
