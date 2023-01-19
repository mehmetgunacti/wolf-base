import { AbstractControl } from '@angular/forms';

export function passwordMatchValidator(fg: AbstractControl) {

	const mismatch = { 'mismatch': true };
	const newPassword = fg.get('newPassword');
	const retypePassword = fg.get('retypePassword');
	if (newPassword && retypePassword)
		return newPassword.value === retypePassword.value ? null : mismatch;

	return mismatch;

}