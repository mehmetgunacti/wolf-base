import { FormControl, FormGroup, Validators } from '@angular/forms';

interface FirestoreConfigForm {

	apiKey: FormControl<string | null>,
	baseURL: FormControl<string | null>,
	projectId: FormControl<string | null>

}

export const configForm: FormGroup<FirestoreConfigForm> = new FormGroup<FirestoreConfigForm>({

	apiKey: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
	baseURL: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
	projectId: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] })

});
