import { InjectionToken, WritableSignal, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Definition, Language, UUID, Word } from '@lib';
import { DefinitionLanguage, DefinitionType } from 'lib/constants/word.constant';

interface LanguageFormSchema {

	name: FormControl<string>;
	language: FormControl<DefinitionLanguage>;

}

interface DefinitionFormSchema {

	id: FormControl<string | null>;
	type: FormControl<DefinitionType>;
	languages: FormArray<FormGroup<LanguageFormSchema>>;
	samples: FormArray<FormControl<string>>;

}

interface WordFormSchema {

	id: FormControl<UUID | null>;
	name: FormControl<string>;
	contexts: FormArray<FormControl<string>>;
	dictionary: FormControl<UUID | null>;
	pronunciation: FormControl<string | null>;
	definitions: FormArray<FormGroup<DefinitionFormSchema>>;

}

class ContextForm {

	// to be used by @if (... track objectId)
	readonly objectId: string;
	readonly fc: FormControl<string>;

	constructor(s?: string) {

		// objectId
		this.objectId = 'context_' + Math.random();

		// form field
		this.fc = new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });

		if (s)
			this.setValue(s);

	}

	setValue(s: string): void {

		this.fc.setValue(s);

	}

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

class LanguageForm {

	// to be used by @if (... track objectId)
	readonly objectId: string;

	// form fields
	readonly name: FormControl<string>;
	readonly language: FormControl<DefinitionLanguage>;

	constructor(language?: Language) {

		// object id
		this.objectId = 'definition_' + Math.random();

		// form fields
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.language = new FormControl<DefinitionLanguage>(DefinitionLanguage.en, { validators: [Validators.required], nonNullable: true });

		if (language)
			this.setValue(language);

	}

	formGroup(): FormGroup<LanguageFormSchema> {

		return new FormGroup({

			name: this.name,
			language: this.language

		});

	}

	setValue(language: Language): void {

		this.name.setValue(language.name);
		this.language.setValue(language.language);

	}

}

class DefinitionForm {

	// to be used by @if (... track objectId)
	readonly objectId: string;

	// form fields
	readonly id: FormControl<UUID | null>;
	readonly type: FormControl<DefinitionType>;
	readonly languages: WritableSignal<LanguageForm[]>;
	readonly samples: WritableSignal<SampleForm[]>;

	constructor(definition?: Definition) {

		// object id
		this.objectId = 'definition_' + Math.random();

		// form fields
		this.id = new FormControl<UUID | null>(null);
		this.type = new FormControl<DefinitionType>(DefinitionType.noun, { validators: [Validators.required], nonNullable: true });

		// languages
		this.languages = signal([new LanguageForm()]);

		// samples
		this.samples = signal([new SampleForm()]);

		if (definition)
			this.setValue(definition);

	}

	addLanguage(): void {

		this.languages.update(list => {
			list.push(new LanguageForm());
			return list;
		});

	}

	removeLanguage(objectId: string): void {

		this.languages.update(
			list => {
				list.splice(list.findIndex(s => s.objectId === objectId), 1);
				return list;
			}
		);

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
			type: this.type,
			languages: new FormArray(this.languages().map(l => l.formGroup())),
			samples: new FormArray(this.samples().map(s => s.fc))

		});

	}

	setValue(definition: Definition): void {

		this.id.setValue(definition.id);
		this.type.setValue(definition.type);

		this.languages.set(definition.languages.map(l => new LanguageForm(l)));
		this.samples.set(definition.samples.map(s => new SampleForm(s)));

	}

}

export class WordForm {

	// form fields
	readonly id: FormControl<UUID | null>;
	readonly name: FormControl<string>;
	readonly dictionary: FormControl<UUID | null>;
	readonly pronunciation: FormControl<string | null>;
	readonly contexts: WritableSignal<ContextForm[]>;

	// definitions
	readonly definitions: WritableSignal<DefinitionForm[]>;

	constructor() {

		// form fields
		this.id = new FormControl<UUID | null>(null);
		this.name = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
		this.dictionary = new FormControl<UUID | null>(null);
		this.pronunciation = new FormControl<string | null>(null);

		// contexts
		this.contexts = signal([new ContextForm()]);

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

	addContext(): void {

		this.contexts.update(list => {
			list.push(new ContextForm());
			return list;
		});

	}

	removeContext(objectId: string): void {

		this.contexts.update(
			list => {
				list.splice(list.findIndex(s => s.objectId === objectId), 1);
				return list;
			}
		);

	}

	formGroup(): FormGroup<WordFormSchema> {

		return new FormGroup<WordFormSchema>({

			id: this.id,
			name: this.name,
			dictionary: this.dictionary,
			pronunciation: this.pronunciation,
			contexts: new FormArray(this.contexts().map(c => c.fc)),
			definitions: new FormArray<FormGroup<DefinitionFormSchema>>(this.definitions().map(d => d.formGroup()))

		});

	}

	setValue(word: Word): void {

		this.id.setValue(word.id);
		this.name.setValue(word.name);
		this.dictionary.setValue(word.dictionary);
		this.pronunciation.setValue(word.pronunciation);

		this.contexts.set(word.contexts.map(c => new ContextForm(c)));

		this.definitions.set(
			word.definitions.map(d => new DefinitionForm(d))
		);

	}

}

export const WORD_FORM = new InjectionToken<WordForm>('WordForm');
