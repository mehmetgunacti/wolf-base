import { Component, computed, effect, ElementRef, input, OnDestroy, output, viewChild } from '@angular/core';
import { delayDestroyTrigger } from '@animations/delayDestroy.animation';
import { GlyphName } from '@constants/glyphs.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '../base.component';
import { ToastConfiguration } from './toast.util';

@Component({
	standalone: true,
	imports: [ GlyphDirective ],
	selector: 'w-toast',
	templateUrl: './toast.component.html',
	animations: [ delayDestroyTrigger ],
	host: {
		'[@delayDestroy]': '',
		'class': 'contents'
	}
})
export class ToastComponent extends BaseComponent implements OnDestroy {

	private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

	// Input
	conf = input.required<ToastConfiguration>();
	top = input<string>('calc(var(--header-height) + 5.5rem)');

	// Output
	close = output<string>();

	severity = computed<string>(() => this.conf().severity);
	protected glyph = computed<GlyphName>((): GlyphName => {

		switch (this.severity()) {

			case 'success': return 'success';
			case 'info': return 'info';
			case 'warn': return 'warn';
			case 'error': return 'error';
			default: return 'help';

		}

	});

	// in case user clicks on toast and closes it,
	// setTimeout fired onClose() should not try to emit event "(close)"
	private open = true;

	constructor() {

		super();
		effect(() => {

			if (!this.conf().sticky && this.conf().life) // life > 0
				setTimeout(() => this.onClose(), this.conf().life);

		});

	}

	ngOnDestroy(): void {

		this.dialog().nativeElement.close();

	}

	onClose(): void {

		if (this.open) {

			this.open = false;
			this.close.emit(this.componentId);

		}

	}

	getId(): string {

		return this.componentId;

	}

}
