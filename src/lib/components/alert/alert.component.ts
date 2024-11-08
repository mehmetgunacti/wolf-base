import { Component, input } from '@angular/core';
import { GlyphName } from '@constants';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '../base.component';

@Component({
	standalone: true,
	imports: [ GlyphDirective ],
	selector: 'w-alert',
	templateUrl: './alert.component.html',
	host: {
		'class': 'flex items-center border rounded-lg min-h-[calc(1.5*var(--widget-height))] shadow-component',

		'[class.text-primary]': 'severity() === "primary"',
		'[class.bg-primary]': 'severity() === "primary"',
		'[class.border-primary]': 'severity() === "primary"',

		'[class.text-success]': 'severity() === "success"',
		'[class.bg-success]': 'severity() === "success"',
		'[class.border-success]': 'severity() === "success"',

		'[class.text-info]': 'severity() === "info"',
		'[class.bg-info]': 'severity() === "info"',
		'[class.border-info]': 'severity() === "info"',

		'[class.text-warn]': 'severity() === "warn"',
		'[class.bg-warn]': 'severity() === "warn"',
		'[class.border-warn]': 'severity() === "warn"',

		'[class.text-error]': 'severity() === "error"',
		'[class.bg-error]': 'severity() === "error"',
		'[class.border-error]': 'severity() === "error"',
	}
})
export class AlertComponent extends BaseComponent {

	// Input
	glyph = input<GlyphName | null>(null);
	severity = input<'primary' | 'success' | 'info' | 'warn' | 'error'>('primary');
	summary = input.required<string>();
	detail = input<string | null>(null);

}
