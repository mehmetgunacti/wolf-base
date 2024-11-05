import { FormControl, Validators } from '@angular/forms';
import { fg, nnfc, urlValidator } from '@utils';

interface FirestoreConfigForm {

	apiKey: FormControl<string | null>,
	baseURL: FormControl<string | null>,
	projectId: FormControl<string | null>;

}

export const configForm = fg<FirestoreConfigForm>({

	apiKey: nnfc(null, [ Validators.required, Validators.minLength(10) ]),
	baseURL: nnfc(null, [ Validators.required, urlValidator() ]),
	projectId: nnfc(null, [ Validators.required, Validators.minLength(3) ])

});
