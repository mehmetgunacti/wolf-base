import { CommonModule } from '@angular/common';
import { Component, ElementRef, InputSignal, WritableSignal, computed, forwardRef, input, output, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { filterArrayElements } from '@utils/array.util';
import { v4 as uuidv4 } from 'uuid';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'w-input-tag',
	standalone: true,
	imports: [ CommonModule, GlyphDirective ],
	templateUrl: './input-tag.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputTagComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(focus)': 'onHostFocus()',
		'class': 'grid grid-cols-[auto,1fr] relative min-h-widget-height px-3 bg-form-element border border-form-element-border rounded-lg focus-within:ring-4 focus-within:ring-outline w-full focus-within:outline-none group'
	}
})
export class InputTagComponent extends BaseComponent implements ControlValueAccessor {

	private inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	// Input
	label: InputSignal<string> = input.required();
	labelUp: InputSignal<boolean> = input(false);
	readonly: InputSignal<boolean> = input(false);
	suggestions: InputSignal<string[]> = input<string[]>([]);

	// Output
	tagInput = output<string | null>();

	protected UUID: WritableSignal<UUID> = signal(uuidv4());
	protected value: WritableSignal<string[]> = signal([]);
	protected disabled: WritableSignal<boolean> = signal(false);
	protected isLabelUp = computed(() => this.labelUp() || !!this.value());
	protected suggestionList = computed(() => filterArrayElements(this.suggestions(), this.value()));

	//////////// boilerplate
	private onChange: any = () => { };
	private onTouched: any = () => { };
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }
	writeValue(value: string[]): void { this.value.set(value); }
	setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
	onBlur(): void { this.onTouched(); }
	onHostFocus(): void { this.inputElement().nativeElement.focus(); }
	////////////

	//////////// Handle Input
	onInput(event: Event): void {

		const target = event.target as HTMLInputElement;
		const inputValue = target.value;

		// if user presses space OR CLICKS ON A SUGGESTION
		// note: all suggestions end with a ' '
		if (inputValue.endsWith(' '))
			this.saveState(inputValue);
		else
			// else emit entered value to receive tag suggestions
			this.tagInput.emit(inputValue);

	}
	onKeydown(event: KeyboardEvent): void {

		if (event.key === 'Enter') {

			event.preventDefault();
			const target = event.target as HTMLInputElement;
			this.saveState(target.value);

		}

	}
	////////////

	private saveState(val: string): void {

		// only characters a-z, 0-9 and '-' are acceptable tag names
		const tagName = val.trim().toLowerCase().replace(/[^a-z0-9-]/gi, '');

		// return if user has entered / pasted only invalid characters
		if (tagName.length < 1) {

			this.inputElement().nativeElement.value = '';
			return;

		}

		// check if already in tag list
		if (this.value().includes(tagName)) {

			// remove invalid characters incl. trailing space
			this.inputElement().nativeElement.value = tagName;
			return;

		}

		// enteres string is ok - save state
		this.value.update(currentValue => {

			const newState = [ ...currentValue, tagName ];
			this.onChange(newState);
			this.onTouched();
			return newState;

		});

		// clear input value and suggestions list
		this.inputElement().nativeElement.value = '';
		this.tagInput.emit(null);

	}

	removeTag(t: string): void {

		this.value.update(value => {

			const newState = value.filter(item => item !== t);
			this.onChange(newState);
			return newState;

		});

	}

}
