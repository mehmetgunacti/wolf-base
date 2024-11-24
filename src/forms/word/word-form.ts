import { InjectionToken } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { DefinitionLanguage, DefinitionType } from '@constants/word.constant';
import { Definition, Language, Word } from '@models/word.model';
import { fa, fc, fg, nnfc } from '@utils/form.util';

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

function fgLanguage(value?: Language): FormGroup<LanguageFormSchema> {

	const {

		name = '',
		language = DefinitionLanguage.en

	} = value ?? {};

	return fg<LanguageFormSchema>({

		name: nnfc(name, Validators.required),
		language: nnfc(language, Validators.required)

	});

}

function faLanguages(value?: Language[]): FormArray<FormGroup<LanguageFormSchema>> {

	let arr = [];
	if (value)
		value.forEach(e => arr.push(fgLanguage(e)));
	if (arr.length === 0)
		arr.push(fgLanguage());
	return fa(arr);

}

function fgDefinition(value?: Definition): FormGroup<DefinitionFormSchema> {

	const {

		id = null,
		languages = [],
		type = DefinitionType.adjective,
		samples = [ '' ]

	} = value ?? {};

	return fg<DefinitionFormSchema>({

		id: fc(id),
		type: nnfc<DefinitionType>(type, Validators.required),
		languages: faLanguages(languages),
		samples: fa(samples.map(s => nnfc<string>(s, Validators.required)))

	});

}

function faDefinitions(value?: Definition[]): FormArray<FormGroup<DefinitionFormSchema>> {

	let arr = [];
	if (value)
		value.forEach(d => arr.push(fgDefinition(d)));
	if (arr.length === 0)
		arr.push(fgDefinition());
	return fa(arr);

}

function fgWord(value?: Word): FormGroup<WordFormSchema> {

	const {

		id = null,
		name = '',
		contexts = [],
		dictionary = null,
		pronunciation = null,
		definitions = []

	} = value ?? {};

	return fg<WordFormSchema>({

		id: fc(id),
		name: nnfc(name, Validators.required),
		contexts: fa(contexts.map(c => nnfc(c, Validators.required))),
		dictionary: fc(dictionary),
		pronunciation: fc(pronunciation),
		definitions: faDefinitions(definitions)

	});

}

export class WordFormImpl {

	fg: FormGroup<WordFormSchema> = fgWord();

	populate(word: Word): void {

		const fg = this.fg;
		const { id, name, contexts, dictionary, pronunciation, definitions } = word;

		// populate word (non-array values)
		fg.patchValue({ id, name, dictionary, pronunciation });

		// populate contexts
		const faContexts = fg.controls.contexts;
		faContexts.clear();
		contexts.forEach(context => faContexts.push(nnfc(context, Validators.required)));

		// populate definitions
		const faDefinitions = fg.controls.definitions;
		faDefinitions.clear();
		definitions.forEach(definition => faDefinitions.push(fgDefinition(definition)));

	}

	addContext(): void {

		this.contexts.push(nnfc('', Validators.required));

	}

	removeContext(idx: number): void {

		this.contexts.removeAt(idx, { emitEvent: true });
		this.fg.markAsDirty();

	}

	addLanguage(dIdx: number): void {

		this.definitions.at(dIdx).controls.languages.push(fgLanguage());

	}

	removeLanguage(dIdx: number, idx: number): void {

		this.definitions.at(dIdx).controls.languages.removeAt(idx);
		this.fg.markAsDirty();

	}

	addSample(dIdx: number): void {

		this.definitions.at(dIdx).controls.samples.push(nnfc('', Validators.required));

	}

	removeSample(dIdx: number, idx: number): void {

		this.definitions.at(dIdx).controls.samples.removeAt(idx);
		this.fg.markAsDirty();

	}

	addDefinition(): void {

		this.definitions.push(fgDefinition());

	}

	removeDefinition(idx: number): void {

		this.definitions.removeAt(idx);
		this.fg.markAsDirty();

	}

	get id(): FormControl<UUID | null> { return this.fg.controls.id; }
	get name(): FormControl<string> { return this.fg.controls.name; }
	get contexts(): FormArray<FormControl<string>> { return this.fg.controls.contexts; }
	get dictionary(): FormControl<UUID | null> { return this.fg.controls.dictionary; }
	get pronunciation(): FormControl<string | null> { return this.fg.controls.pronunciation; }
	get definitions(): FormArray<FormGroup<DefinitionFormSchema>> { return this.fg.controls.definitions; }

}

export const WORD_FORM = new InjectionToken<WordFormImpl>('WordForm');
