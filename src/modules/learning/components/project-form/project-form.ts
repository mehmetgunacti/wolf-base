import { formatDate } from '@angular/common';
import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISODateString, Learning, LearningStatus, UUID } from '@lib';

interface LearningFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	description: FormControl<string | null>;
	status: FormControl<LearningStatus>;
	start: FormControl<string>;
	end: FormControl<ISODateString | null>;

}

export class LearningForm {

	// form fields
	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;
	readonly description: FormControl<string | null>;
	readonly status: FormControl<LearningStatus>;
	readonly start: FormControl<string>;
	readonly end: FormControl<string | null>;

	constructor() {

		// form fields
		this.id = new FormControl<UUID | null>(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.description = new FormControl<string | null>(null);
		this.status = new FormControl<LearningStatus>(LearningStatus.ongoing, { validators: [Validators.required], nonNullable: true });
		this.start = new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en'), { validators: [Validators.required], nonNullable: true });
		this.end = new FormControl<string | null>(null);

	}

	formGroup(): FormGroup<LearningFormSchema> {

		return new FormGroup<LearningFormSchema>({

			id: this.id,
			name: this.name,
			description: this.description,
			status: this.status,
			start: this.start,
			end: this.end

		});

	}

	setValue(learning: Learning): void {

		this.id.setValue(learning.id);
		this.name.setValue(learning.name);
		this.description.setValue(learning.description);
		this.status.setValue(learning.status);
		this.start.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
		this.end.setValue(learning.end);

	}

}

export const LEARNING_FORM = new InjectionToken<LearningForm>('LearningForm');
