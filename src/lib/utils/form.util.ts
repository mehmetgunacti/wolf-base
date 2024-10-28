import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fc<T>(value: T | null = null): FormControl<T | null> {

	return new FormControl<T | null>(value);

}

export function nnfc<T>(value: T, validators: ValidatorFn | ValidatorFn[] | null | undefined = []): FormControl<T> {

	return new FormControl<T>(value, { validators, nonNullable: true });

}

export function fg<T extends { [ K in keyof T ]: AbstractControl<any, any>; }>(value: T = {} as T): FormGroup<T> {

	return new FormGroup<T>(value);

}

export function fa<T extends AbstractControl<any, any>>(value: T[] = []): FormArray<T> {

	return new FormArray<T>(value);

}

export function urlValidator(): ValidatorFn {

	return (control: AbstractControl): ValidationErrors | null => {

		try {
			new URL(control.value);
			return null;
		} catch (_) {
			return { invalidUrl: true };
		}

	};

};
