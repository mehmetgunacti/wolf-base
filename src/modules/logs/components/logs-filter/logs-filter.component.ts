import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LogCategory } from 'lib';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-logs-filter',
	templateUrl: './logs-filter.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsFilterComponent implements OnChanges, OnDestroy {

	categories: { label: string, value?: string, disabled?: boolean }[];
	fcCategory = new FormControl();
	fcSearch = new FormControl('');
	subscription: Subscription;

	@Input() selectedCategory: LogCategory | null = null;

	@Output() category: EventEmitter<LogCategory> = new EventEmitter();

	constructor() {

		this.categories = [
			{ label: 'Select...', disabled: true },
			...Object.entries(LogCategory).map(([value, label]) => ({ label, value }))
		];
		this.subscription = this.fcCategory.valueChanges.subscribe(category => this.category.emit(category));

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
