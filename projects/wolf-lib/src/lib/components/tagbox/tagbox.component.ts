import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, tap } from 'rxjs';

@Component({
	selector: 'w-tagbox',
	templateUrl: './tagbox.component.html',
	styleUrls: ['./tagbox.component.scss']
})
export class TagboxComponent implements OnInit {

	@ViewChild('element', { static: true }) e!: ElementRef<HTMLInputElement>;

	@Input() wControl: FormControl<string[]> = new FormControl<string[]>([], { nonNullable: true });
	@Input() wSuggestions: string[] = [];

	@Output() wInput = new EventEmitter<string>();

	@HostBinding('class.focus') focused = false;
	@HostBinding('class:inputFocus') inputFocus = false;
	@HostBinding('class.error') error = false;

	tags$!: Observable<string[]>;

	ngOnInit(): void {

		console.log(this.wControl.value);

		this.tags$ = this.wControl.valueChanges.pipe(

			startWith(this.wControl.value),
			tap(tags => this.focused = tags.length > 0)

		);

	}

	removeTag(t: string): void {

		const tags: string[] = this.wControl.value;

		this.wControl.setValue(tags.filter(item => item !== t));
		this.wControl.markAsDirty();
		this.wControl.updateValueAndValidity();

		// this.onBlur();

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
			this.wControl.markAsDirty();
			this.wControl.updateValueAndValidity();

			// set input value to empty space
			this.e.nativeElement.value = '';

			return;

		}

		// emit value to receive tag suggestions
		this.wInput.emit(tagName);

	}

	onFocus(): void {

		this.inputFocus = true;
		// this.error = this.wControl.invalid && this.wControl.dirty;

	}

	onBlur(): void {

		// if (this.isNotFocused())
// 			this.focused = false;
		this.inputFocus = false;
		this.error = this.wControl.invalid && this.wControl.dirty;

	}

	private isNotFocused(): boolean {

		// no tags (buttons) and <input> element must be empty
		return this.wControl.value.length === 0 && this.e.nativeElement.value === '';

	}

}
