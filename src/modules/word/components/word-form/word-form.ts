import { InjectionToken, WritableSignal, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Definition, UUID, Word } from '@lib';
import { DefinitionLanguage, DefinitionType } from 'lib/constants/word.constant';

interface DefinitionFormSchema {

	id: FormControl<string | null>;
	name: FormControl<string>;
	language: FormControl<DefinitionLanguage>;
	type: FormControl<DefinitionType>;
	samples: FormArray<FormControl<string>>;

}

interface WordFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	context: FormControl<string | null>;
	dictionary: FormControl<UUID | null>;
	pronunciation: FormControl<string | null>;
	definitions: FormArray<FormGroup<DefinitionFormSchema>>;

}

class SampleForm {

	// to be used by @if (... track objectId)
	readonly objectId: string;
	readonly fc: FormControl<string>;

	constructor(s?: string) {

		// objectId
		this.objectId = 'sample_' + Math.random();

		// form field
		this.fc = new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });

		if (s)
			this.setValue(s);

	}

	setValue(s: string): void {

		this.fc.setValue(s);

	}

}

class DefinitionForm {

	// to be used by @if (... track objectId)
	readonly objectId: string;

	// form fields
	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;
	readonly language: FormControl<DefinitionLanguage>;
	readonly type: FormControl<DefinitionType>;
	readonly samples: WritableSignal<SampleForm[]>;

	constructor(definition?: Definition) {

		// object id
		this.objectId = 'definition_' + Math.random();

		// form fields
		this.id = new FormControl<UUID | null>(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.language = new FormControl<DefinitionLanguage>(DefinitionLanguage.en, { validators: [Validators.required], nonNullable: true });
		this.type = new FormControl<DefinitionType>(DefinitionType.noun, { validators: [Validators.required], nonNullable: true });

		// samples
		this.samples = signal([new SampleForm()]);

		if (definition)
			this.setValue(definition);

	}

	addSample(): void {

		this.samples.update(list => {
			list.push(new SampleForm());
			return list;
		});

	}

	removeSample(objectId: string): void {

		this.samples.update(
			list => {
				list.splice(list.findIndex(s => s.objectId === objectId), 1);
				return list;
			}
		);

	}

	formGroup(): FormGroup<DefinitionFormSchema> {

		return new FormGroup({

			id: this.id,
			name: this.name,
			language: this.language,
			type: this.type,
			samples: new FormArray(this.samples().map(s => s.fc))

		});

	}

	setValue(definition: Definition): void {

		this.id.setValue(definition.id);
		this.name.setValue(definition.name);
		this.language.setValue(definition.language);
		this.type.setValue(definition.type);

		this.samples.set(definition.samples.map(s => new SampleForm(s)));

	}

}

export class WordForm {

	// form fields
	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;
	readonly context: FormControl<string | null>;
	readonly dictionary: FormControl<UUID | null>;
	readonly pronunciation: FormControl<string | null>;

	// definitions
	readonly definitions: WritableSignal<DefinitionForm[]>;

	constructor() {

		// form fields
		this.id = new FormControl<UUID | null>(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.context = new FormControl<string | null>(null);
		this.dictionary = new FormControl<UUID | null>(null);
		this.pronunciation = new FormControl<string | null>(null);

		// definitions
		this.definitions = signal([new DefinitionForm()])

	}

	addDefinition(): void {

		this.definitions.update(list => {
			list.push(new DefinitionForm());
			return list;
		});

	}

	removeDefinition(objectId: string): void {

		this.definitions.update(
			list => {
				list.splice(list.findIndex(d => d.objectId === objectId), 1);
				return list;
			}
		);

	}

	formGroup(): FormGroup<WordFormSchema> {

		return new FormGroup<WordFormSchema>({

			id: this.id,
			name: this.name,
			context: this.context,
			dictionary: this.dictionary,
			pronunciation: this.pronunciation,
			definitions: new FormArray<FormGroup<DefinitionFormSchema>>(this.definitions().map(d => d.formGroup()))

		});

	}

	setValue(word: Word): void {

		this.id.setValue(word.id);
		this.name.setValue(word.name);
		this.context.setValue(word.context);
		this.dictionary.setValue(word.dictionary);
		this.pronunciation.setValue(word.pronunciation);

		this.definitions.set(
			word.definitions.map(d => new DefinitionForm(d))
		);

	}

}

export const WORD_FORM = new InjectionToken<WordForm>('WordForm');
