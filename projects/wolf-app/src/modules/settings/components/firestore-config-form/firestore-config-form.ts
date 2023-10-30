import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreConfig } from 'lib';
import { FormClass, FormClassImpl } from 'lib';

export interface EditForm extends Record<keyof FirestoreConfig, FormControl> {

	apiKey: FormControl<string | null>;
	baseURL: FormControl<string | null>;
	projectId: FormControl<string | null>;

}

export interface FirestoreConfigForm extends EditForm, FormClass<FirestoreConfig> { }

export class EditFormImpl extends FormClassImpl<FirestoreConfig> implements FirestoreConfigForm {

	protected override createFormGroup(): FormGroup<EditForm> {

		return new FormGroup<EditForm>({
			apiKey: new FormControl<string | null>(null, [Validators.required]),
			baseURL: new FormControl<string | null>(null, [Validators.required]),
			projectId: new FormControl<string | null>(null, [Validators.required])
		});

	}

	setValues(item: FirestoreConfig): void {

		this.apiKey.setValue(item.apiKey, { emitEvent: false });
		this.baseURL.setValue(item.baseURL, { emitEvent: false });
		this.projectId.setValue(item.projectId, { emitEvent: false });

	}

	override get value(): FirestoreConfig {

		return this._formGroup.value;

	}

	get apiKey(): FormControl<string | null> {
		return <FormControl<string>>this._formGroup.controls['apiKey'];
	}

	get baseURL(): FormControl<string | null> {
		return <FormControl<string>>this._formGroup.controls['baseURL'];
	}

	get projectId(): FormControl<string | null> {
		return <FormControl<string>>this._formGroup.controls['projectId'];
	}

}
