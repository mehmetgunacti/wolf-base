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
	template: `
		<dialog #dialog open (click)="onClose()" class="
			hidden
			opacity-0
			open:opacity-100
			open:grid
			open:grid-flow-row
			p-2
			fixed

			w-11/12
			sm:w-80
			min-h-20

			z-overlay

			shadow-component
			bg-accent
			text-white
			rounded-lg
			cursor-pointer

			open:top-20

			sm:inset-auto

			open:sm:inset-auto
			open:sm:top-20
			open:sm:right-4

			[transition-property:display_opacity]
			[transition-behavior:allow-discrete]
			duration-500

			starting:open:top-[-100%]
			starting:sm:open:right-[-100%]

		">
			<div class="flex items-center flex-1">
				<div class="flex items-center justify-center p-2">
					<svg [wGlyph]="glyph()"></svg>
				</div>
				<div class="flex flex-col flex-1 p-2">
					<span class="font-bold text-lg">{{conf().summary}}</span>
					<span class="">{{conf().detail}}</span>
				</div>
			</div>
		</dialog>
	`,
	animations: [ delayDestroyTrigger ],
	host: {
		'[@delayDestroy]': '',
		'[class]': 'contents'
	}
})
export class ToastComponent extends BaseComponent implements OnDestroy {

	private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

	// Input
	conf = input.required<ToastConfiguration>();

	// Output
	close = output<string>();

	severity = computed<string>(() => this.conf().severity);
	protected glyph = computed<GlyphName>((): GlyphName => {

		switch (this.severity()) {

			case 'success': return 'task_alt';
			case 'info': return 'question_diamond';
			case 'warn': return 'bookmark_add';
			case 'error': return 'backspace';
			default: return 'help';

		}

	});

	constructor() {

		super();
		effect(() => {

			if (!this.conf().sticky && this.conf().life) // life > 0
				setTimeout(() => this.onClose(), this.conf().life);

		});

	}

	ngOnDestroy(): void {

		console.log('destroying', this.componentId);

		this.dialog().nativeElement.close();

	}

	onClose(): void {

		this.close.emit(this.componentId);

	}

	getId(): string {

		return this.componentId;

	}

}
