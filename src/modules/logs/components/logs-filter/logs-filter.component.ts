import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LogCategory, UUID } from 'lib';
import { Subscription, filter } from 'rxjs';

@Component({
	selector: 'app-logs-filter',
	templateUrl: './logs-filter.component.html',
	styleUrls: ['./logs-filter.component.scss'],
	host: { 'class': 'd-flex gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsFilterComponent implements OnChanges, OnDestroy {

	categories: { label: string, value?: string, disabled?: boolean }[];
	fcCategory = new FormControl();
	fcSearch = new FormControl('');
	subscription: Subscription = new Subscription();

	@Input() set selectedId(id: UUID | null) {

		this.fcSearch.setValue(id, { emitEvent: false });

	}

	@Output() category: EventEmitter<LogCategory> = new EventEmitter();
	@Output() entityId: EventEmitter<UUID> = new EventEmitter();

	constructor() {

		this.categories = [
			{ label: 'Select...', disabled: true },
			...Object.entries(LogCategory).map(([value, label]) => ({ label, value }))
		];

		// select category / table
		this.subscription.add(

			this.fcCategory.valueChanges.subscribe(category => this.category.emit(category))

		);

		// search by entityId
		this.subscription.add(

			this.fcSearch.valueChanges.pipe(
				filter((val): val is UUID => val !== null)
			).subscribe(val => this.entityId.emit(val))

		);

	}

	ngOnChanges(changes: SimpleChanges): void {

		const selectedCategory: LogCategory = changes['selectedCategory']?.currentValue;
		if (!!selectedCategory)
			this.fcCategory.patchValue(selectedCategory);

	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}
