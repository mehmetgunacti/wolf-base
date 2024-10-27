import { FormControl, Validators } from '@angular/forms';
import { fg, nnfc } from '@utils';

interface FirestoreConfigForm {

	apiKey: FormControl<string | null>,
	baseURL: FormControl<string | null>,
	projectId: FormControl<string | null>;

}

export const configForm = fg<FirestoreConfigForm>({

	apiKey: nnfc(null, [ Validators.required, Validators.minLength(3) ]),
	baseURL: nnfc(null, [ Validators.required, Validators.minLength(3) ]),
	projectId: nnfc(null, [ Validators.required, Validators.minLength(3) ])

});
