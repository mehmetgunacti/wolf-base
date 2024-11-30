import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { TestSuite } from '@models/test-suite.model';
import { fc, fg, nnfc } from '@utils/form.util';

interface TestSuiteFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	description: FormControl<string | null>;

}

function createFormGroup(value?: TestSuite): FormGroup<TestSuiteFormSchema> {

	const {

		id = null,
		name = '',
		description = null

	} = value ?? {};

	return fg<TestSuiteFormSchema>({

		id: fc(id),
		name: nnfc(name, Validators.required),
		description: fc(description),

	});

}

export class TestSuiteFormImpl {

	readonly fg: FormGroup<TestSuiteFormSchema> = createFormGroup();

	populate(entity: TestSuite): void {

		const fg = this.fg;
		const { id, name, description } = entity;

		// populate (non-array values)
		fg.patchValue({ id, name, description });

	}

	get id(): FormControl<UUID | null> { return this.fg.controls.id; }
	get name(): FormControl<string> { return this.fg.controls.name; }
	get description(): FormControl<string | null> { return this.fg.controls.description; }

}

export const TEST_SUITE_FORM = new InjectionToken<TestSuiteFormImpl>('TEST_SUITE_FORM');
