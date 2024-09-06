import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, inject, input, InputSignal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NameBase } from 'lib/models';

@Component({
	selector: 'w-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(focus)': 'onHostFocus()'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements ControlValueAccessor {

	private selectElement = viewChild.required<ElementRef<HTMLSelectElement>>('selectElement');

	private cd = inject(ChangeDetectorRef);

	// Input
	label: InputSignal<string> = input.required();
	readonly: InputSignal<boolean> = input(false);
	nodes: InputSignal<NameBase[]> = input.required<NameBase[]>();

	protected value = '';
	protected disabled = false;

	//////////// boilerplate
	private onChange: any = () => { }
	private onTouched: any = () => { }
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }
	writeValue(value: string): void { this.value = value; this.cd.markForCheck(); }
	setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
	////////////

	onSelect(event: Event): void {

		const target = event.target as HTMLSelectElement;
		this.value = target.value;
		this.onChange(this.value);
		this.onTouched();

	}

	onBlur(): void {

		this.onTouched();

	}

	onHostFocus(): void {

		this.selectElement().nativeElement.focus();

	}

}
