import { InjectionToken } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { Exam, Question } from '@models/test-suite.model';
import { fa, fc, fg, nnfc } from '@utils/form.util';
import { v4 as uuidv4 } from 'uuid';

interface QuestionFormSchema {

	id: FormControl<string>;
	answers: FormControl<boolean[]>;
	description: FormControl<string | null>;

}

interface ExamFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	description: FormControl<string | null>;
	questions: FormArray<FormGroup<QuestionFormSchema>>;

}

function fgQuestion(value?: Question): FormGroup<QuestionFormSchema> {

	const {

		id = uuidv4(),
		description = null,
		answers = [ false, false, false, false, false, false ]

	} = value ?? {};

	return fg<QuestionFormSchema>({

		id: nnfc(id, Validators.required),
		description: nnfc<string | null>(description),
		answers: nnfc<boolean[]>(answers, [ Validators.required, Validators.minLength(1) ])

	});

}

function faQuestions(value?: Question[]): FormArray<FormGroup<QuestionFormSchema>> {

	let arr = [];
	if (value)
		value.forEach(d => arr.push(fgQuestion(d)));
	if (arr.length === 0)
		arr.push(fgQuestion());
	return fa(arr);

}

function createFormGroup(value?: Exam): FormGroup<ExamFormSchema> {

	const {

		id = null,
		name = '',
		questions = [],
		description = null

	} = value ?? {};

	return fg<ExamFormSchema>({

		id: fc(id),
		name: nnfc(name, Validators.required),
		description: nnfc<string | null>(description),
		questions: faQuestions(questions)

	});

}

export class ExamFormImpl {

	fg: FormGroup<ExamFormSchema> = createFormGroup();

	populate(entity: Exam): void {

		const fg = this.fg;
		const { id, name, description, questions } = entity;

		// populate (non-array values)
		fg.patchValue({ id, name, description, questions });

		// populate questions
		const faQuestions = fg.controls.questions;
		faQuestions.clear();
		questions.forEach(question => faQuestions.push(fgQuestion(question)));

	}

	addQuestion(): void {

		this.questions.push(fgQuestion());
		this.fg.markAsDirty();

	}

	removeQuestion(idx: number): void {

		this.questions.removeAt(idx);
		this.fg.markAsDirty();

	}

	get id(): FormControl<UUID | null> { return this.fg.controls.id; }
	get name(): FormControl<string> { return this.fg.controls.name; }
	get description(): FormControl<string | null> { return this.fg.controls.description; };
	get questions(): FormArray<FormGroup<QuestionFormSchema>> { return this.fg.controls.questions; }

}

export const EXAM_FORM = new InjectionToken<ExamFormImpl>('EXAM_FORM');
