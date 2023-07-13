import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from 'lib';
import { FormClass, FormClassImpl } from 'modules/shared';

export interface EditForm extends Record<keyof Credentials, FormControl> {

	apiKey: FormControl<string | null>;
	baseURL: FormControl<string | null>;
	projectId: FormControl<string | null>;

}

export interface CredentialsForm extends EditForm, FormClass<Credentials> { }

export class EditFormImpl extends FormClassImpl<Credentials> implements CredentialsForm {

	protected override createFormGroup(): FormGroup<EditForm> {

		return new FormGroup<EditForm>({
			apiKey: new FormControl<string | null>(null, [Validators.required]),
			baseURL: new FormControl<string | null>(null, [Validators.required]),
			projectId: new FormControl<string | null>(null, [Validators.required])
		});

	}

	setValues(item: Credentials): void {

		this.apiKey.setValue(item.apiKey, { emitEvent: false });
		this.baseURL.setValue(item.baseURL, { emitEvent: false });
		this.projectId.setValue(item.projectId, { emitEvent: false });

	}

	override get value(): Credentials {

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