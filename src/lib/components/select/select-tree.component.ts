import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, input, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HasParentId } from '@models/entity.model';
import { BaseComponent } from '../base.component';
import { OptionsComponent } from './options.component';
import { ROOT_ID } from './select.util';

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, CdkTreeModule, CdkMenuModule, OptionsComponent, CommonModule ],
	selector: 'w-select-tree',
	templateUrl: './select-tree.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectTreeComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(focus)': 'onHostFocus()',
		'window:resize': 'onResize()',
		'class': 'inline-flex relative h-widget-height bg-form-element border border-form-element-border hover:border-outline rounded-lg focus-within:ring-4 focus-within:ring-outline w-full outline-none group'
	}
})
export class SelectTreeComponent extends BaseComponent implements ControlValueAccessor {

	private trigger = viewChild.required<CdkMenuTrigger>(CdkMenuTrigger);
	private select = viewChild.required<ElementRef<HTMLSelectElement>>('select');

	// Input
	label = input.required<string>();
	readonly = input<boolean>(false);
	nodes = input<HasParentId[]>([]);

	protected value = signal<string | null>('');
	protected disabled = signal<boolean>(false);

	//////////// boilerplate
	private onChange: any = () => { };
	private onTouched: any = () => { };
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }
	writeValue(value: string): void { this.value.set(value); }
	setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
	////////////

	popupWidth = signal<number>(200);

	onResize() {

		this.trigger().close();

	}

	onSelectClicked(event: MouseEvent): void {

		event.preventDefault; // prevents native select options to open
		this.select().nativeElement.focus();
		this.popupWidth.set(this.select().nativeElement.clientWidth);

	}

	onItemSelected(item: HasParentId | null): void {

		if (item !== null)
			this.value.set(item.id === ROOT_ID ? null : item.id);

		this.onChange(this.value());
		this.onTouched();
		this.trigger().close();
		this.select().nativeElement.focus();

	}

	onKeydown(event: KeyboardEvent): void {

		this.popupWidth.set(this.select().nativeElement.clientWidth);

		if (hasModifierKey(event)) // ctrl, shift etc.
			return;

		switch (event.key) {

			case "Tab": break;
			default: event.preventDefault(); // prevents native select options to open

		}

	}

	onHostFocus(): void {

		this.select().nativeElement.focus();

	}

}
