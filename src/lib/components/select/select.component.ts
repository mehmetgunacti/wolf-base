import { Component, ElementRef, forwardRef, input, signal, viewChild, WritableSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NameBase } from '@models/id-base.model';
import { BaseComponent } from '../base.component';

@Component({
	standalone: true,
	selector: 'w-select',
	templateUrl: './select.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(focus)': 'onHostFocus()',
		'class': 'inline-flex relative h-widget-height bg-form-element border border-form-element-border rounded-lg focus-within:ring-4 focus-within:ring-outline w-full focus-within:outline-none group'
	}
})
export class SelectComponent extends BaseComponent implements ControlValueAccessor {

	private selectElement = viewChild.required<ElementRef<HTMLSelectElement>>('selectElement');

	// Input
	label = input.required<string>();
	readonly = input<boolean>(false);
	nodes = input.required<NameBase[]>();

	protected value: WritableSignal<string> = signal('');
	protected disabled: WritableSignal<boolean> = signal(false);

	//////////// boilerplate
	private onChange: any = () => { };
	private onTouched: any = () => { };
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }
	writeValue(value: string): void { this.value.set(value); }
	setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
	////////////

	onSelect(event: Event): void {

		const target = event.target as HTMLSelectElement;
		this.value.set(target.value);
		this.onChange(target.value);
		this.onTouched();

	}

	onBlur(): void {

		this.onTouched();

	}

	onHostFocus(): void {

		this.selectElement().nativeElement.focus();

	}

}
