import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'w-tagbox',
	templateUrl: './tagbox.component.html',
	styleUrls: ['./tagbox.component.scss']
})
export class TagboxComponent {

	@ViewChild('element', { static: true }) e!: ElementRef<HTMLInputElement>;

	@Input() wControl: FormControl<string[]> = new FormControl();
	@Input() wSuggestions: string[] = [];

	@Output() wInput = new EventEmitter<string>();

	@HostBinding('class.focused') focused = false;
	error: string | null = '';
	subscriptions = new Subscription();

	removeTag(t: string): void {

		const tags: string[] = this.wControl.value;

		this.wControl.setValue(tags.filter(item => item !== t));
		this.wControl.markAsDirty();
		this.wControl.updateValueAndValidity();

	}

	addTag(s: any): void {

		console.log(s);

		alert(s);
		const tags: string[] = this.wControl.value;
		if (!tags.includes(s)) {
			this.wControl.setValue([...tags, s]);
			this.wControl.markAsDirty();
			this.wControl.updateValueAndValidity();
			this.e.nativeElement.value = '';
		}
		this.e.nativeElement.focus();

	}

	onInput(): void {

		const val = this.e.nativeElement.value;

		// Check for trailing space
		const hasTrailingSpace = val.endsWith(' ');

		// only characters a-z, 0-9 and '-' are acceptable tag names
		const tagName = val.trim().toLowerCase().replace(/[^a-z0-9-]/gi, '');

		// return if user has entered / pasted only invalid characters
		if (tagName.length < 1) {

			this.e.nativeElement.value = '';
			return;

		}

		if (hasTrailingSpace) {

			// check if already in tag list
			if (this.wControl.value.includes(tagName)) {

				this.e.nativeElement.value = tagName; // removes trailing space
				return;

			}

			// add to tag list
			this.wControl.setValue([...this.wControl.value, tagName]);

			// mark as dirty
			this.wControl.markAsDirty();

			// set input value to empty space
			this.e.nativeElement.value = '';

			return;

		}

		// emit value to receive tag suggestions
		this.wInput.emit(tagName);

	}

	onBlur(): void {

		this.focused = false;

	}

	onFocus(): void {

		this.focused = true;

	}

}
