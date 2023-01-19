import { FormArray, FormControl, FormGroup, AbstractControl } from '@angular/forms';

export type IForm = Record<string, FormControl | FormArray | FormGroup>;

export const isValid = (fg: FormGroup): boolean => {

	if (fg.valid)
		return true;

	markFieldsAsDirty(fg);
	return false;

};

export const isInvalid = (fg: FormGroup): boolean => !isValid(fg);

export const markFieldsAsDirty = (c: AbstractControl): void => {

	if (c instanceof FormArray)
		for (const item of c.controls)
			markFieldsAsDirty(item);

	else if (c instanceof FormGroup)
		for (const item of Object.values(c.controls))
			markFieldsAsDirty(item);

	else if (c instanceof FormControl) {
		c.markAsDirty();
		c.updateValueAndValidity();
	}

};

export const traverseAbstractControl = (c: AbstractControl, fn: (c: AbstractControl) => void): void => {

	if (c instanceof FormArray)
		for (const item of c.controls) {
			fn(item);
			traverseAbstractControl(item, fn);
		}

	else if (c instanceof FormGroup)
		for (const item of Object.values(c.controls)) {
			fn(item);
			traverseAbstractControl(item, fn);
		}

	else if (c instanceof FormControl)
		fn(c);

};

// export const markFieldsAsDirty = (c: FormGroup) => {

// 	Object.keys(c.controls).forEach(fieldName => {

// 		const control = c.get(fieldName);
// 		if (control instanceof FormControl) {

// 			control.markAsDirty();
// 			control.updateValueAndValidity();

// 		} else if (control instanceof FormGroup)

// 			markFieldsAsDirty(control);

// 		// else if (control instanceof FormArray)

// 		// 	control.controls.forEach((c:  => markFieldsAsDirty(c));

// 	});
// };

export const getDirtyValues = <T>(form: FormGroup): Partial<T> => {

	// tslint:disable-next-line: no-any
	const dirtyValues: Record<string, any> = {};
	Object.keys(form.controls).forEach(key => {

		const currentControl = form.controls[key];
		if (currentControl.dirty) {

			if (currentControl instanceof FormGroup)
				dirtyValues[key] = getDirtyValues(currentControl);
			else
				dirtyValues[key] = currentControl.value;

		}

	});
	return dirtyValues as T;

};
