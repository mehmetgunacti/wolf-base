import { AfterViewInit, Component, computed, effect, ElementRef, input, output, viewChild } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ToastConfiguration } from './toast.util';
import { GlyphDirective } from '@directives/glyph.directive';
import { GlyphName } from '@constants/glyphs.constant';
import { Subject } from 'rxjs';

@Component({
	standalone: true,
	imports: [ GlyphDirective ],
	selector: 'w-toast',
	template: `
		<dialog #dialog class="grid grid-flow-row p-2 fixed w-11/12 sm:w-80 min-h-20 z-overlay shadow-component bg-accent text-white rounded-lg open:sm:inset-auto open:top-20 open:sm:top-20 open:sm:right-4 transition-all duration-500 starting:open:top-[-100%] starting:sm:open:right-[-100%]">
			<form method="dialog" class="flex flex-col sm:flex-row">
				<div class="flex items-center flex-1">
					<div class="flex items-center justify-center p-2">
						<svg [wGlyph]="glyph()"></svg>
					</div>
					<div class="flex flex-col flex-1 p-2">
						<span class="font-bold">{{conf().summary}}</span>
						<span class="text-secondary">{{conf().detail}}</span>
					</div>
				</div>
				<button class="btn btn-ghost self-end sm:self-center">Confirm</button>
			</form>
		</dialog>
	`,
	host: {
		'[class]': 'contents'
	}
})
export class ToastComponent extends BaseComponent implements AfterViewInit {

	private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

	// Input
	conf = input.required<ToastConfiguration>();

	// Output
	close = output<number>();

	private afterViewInit$ = new Subject<void>();
	afterViewInit = this.afterViewInit$.asObservable();
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

	ngAfterViewInit(): void {

		this.afterViewInit$.next();
		this.afterViewInit$.complete();

	}

	show(): void {

		this.dialog().nativeElement.show();

	}

	onClose(): void {

		const id = this.conf().id;
		if (id)
			this.close.emit(id);

	}

}
