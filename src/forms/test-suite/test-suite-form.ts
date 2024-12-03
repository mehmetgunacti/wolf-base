import { InjectionToken } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { Question, Exam, TestSuite } from '@models/test-suite.model';
import { fa, fc, fg, nnfc } from '@utils/form.util';
import { v4 as uuidv4 } from 'uuid';

// interface QuestionFormSchema {
//
// 	id: FormControl<UUID | null>;
// 	answers: FormControl<boolean[]>;
// 	description: FormControl<string | null>;
//
// }

interface TestFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	description: FormControl<string | null>;

}

interface TestSuiteFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	description: FormControl<string | null>;
	tests: FormArray<FormGroup<TestFormSchema>>;

}

// function fgQuestion(value?: Question): FormGroup<QuestionFormSchema> {
//
// 	const {
//
// 		id = uuidv4(),
// 		answers = [],
// 		description = null
//
// 	} = value ?? {};
//
// 	return fg<QuestionFormSchema>({
//
// 		id: nnfc(id, Validators.required),
// 		answers: nnfc(answers, [ Validators.required, Validators.minLength(1) ]),
// 		description: fc(description)
//
// 	});
//
// }
//
// function faQuestions(value?: Question[]): FormArray<FormGroup<QuestionFormSchema>> {
//
// 	let arr = [];
// 	if (value)
// 		value.forEach(q => arr.push(fgQuestion(q)));
// 	if (arr.length === 0)
// 		arr.push(fgQuestion());
// 	return fa(arr);
//
// }

function fgTest(value?: Exam): FormGroup<TestFormSchema> {

	const {

		id = uuidv4(),
		name = '',
		description = null
		// questions = []

	} = value ?? {};

	return fg<TestFormSchema>({

		id: nnfc(id, Validators.required),
		name: nnfc<string>(name, Validators.required),
		description: fc(description)

	});

}

function faTests(value?: Exam[]): FormArray<FormGroup<TestFormSchema>> {

	let arr = [];
	if (value)
		value.forEach(d => arr.push(fgTest(d)));
	if (arr.length === 0)
		arr.push(fgTest());
	return fa(arr);

}

function createFormGroup(value?: TestSuite): FormGroup<TestSuiteFormSchema> {

	const {

		id = null,
		name = '',
		description = null,
		tests = []

	} = value ?? {};

	return fg<TestSuiteFormSchema>({

		id: fc(id),
		name: nnfc(name, Validators.required),
		description: fc(description),
		tests: faTests(tests)

	});

}

export class TestSuiteFormImpl {

	readonly fg: FormGroup<TestSuiteFormSchema> = createFormGroup();

	populate(entity: TestSuite): void {

		const fg = this.fg;
		const { id, name, description, tests } = entity;

		// populate (non-array values)
		fg.patchValue({ id, name, description });

		// populate tests
		const faTests = fg.controls.tests;
		faTests.clear();
		tests.forEach(test => faTests.push(fgTest(test)));

	}

// 	addQuestion(testIdx: number): void {
//
// 		this.tests.at(testIdx).controls.questions.push(fgQuestion());
// 		this.fg.markAsDirty();
//
// 	}
//
// 	removeQuestion(dIdx: number, idx: number): void {
//
// 		this.tests.at(dIdx).controls.questions.removeAt(idx);
// 		this.fg.markAsDirty();
//
// 	}

	addTest(): void {

		this.tests.push(fgTest());
		this.fg.markAsDirty();

	}

	removeTest(idx: number): void {

		this.tests.removeAt(idx);
		this.fg.markAsDirty();

	}

	get id(): FormControl<UUID | null> { return this.fg.controls.id; }
	get name(): FormControl<string> { return this.fg.controls.name; }
	get description(): FormControl<string | null> { return this.fg.controls.description; }
	get tests(): FormArray<FormGroup<TestFormSchema>> { return this.fg.controls.tests; }

}

export const TEST_SUITE_FORM = new InjectionToken<TestSuiteFormImpl>('TEST_SUITE_FORM');
