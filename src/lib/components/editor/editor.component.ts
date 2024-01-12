import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formatBytes } from 'lib/utils';
import { Observable, map, startWith, take, tap, timer } from 'rxjs';
import { ClipboardService } from 'services';

@Component({
	selector: 'w-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {

	@ViewChild('editor') editor!: ElementRef<HTMLTextAreaElement>;
	@ViewChild(CdkMenuTrigger) trigger!: CdkMenuTrigger;
	@ViewChild('previewTemplate') previewTemplate!: TemplateRef<HTMLDivElement>;

	@Input() control!: FormControl;
	@Input() name: string = '';
	@Input() readonly = false;
	@Input() rows = 30;
	@Input() cols = 20;

	@Output() inputChanged: EventEmitter<string> = new EventEmitter();

	content: WritableSignal<string | null> = signal(null);
	contentSizeString = computed(() => formatBytes(this.content()?.length ?? 0));

	// isPreview: WritableSignal<boolean> = signal(false);
	btnImageShake: WritableSignal<boolean> = signal(false);

	hasValue$!: Observable<boolean>;

	private clipboardService: ClipboardService = inject(ClipboardService);
	private dialogService: Dialog = inject(Dialog);
	private previewDialogRef: DialogRef<null, HTMLDivElement> | null = null;

	ngOnInit(): void {

		this.hasValue$ = this.control.valueChanges.pipe(

			startWith(this.control.value),
			tap(val => this.content.set(val)),
			map(val => this.hasValue(val))

		);

	}

	private hasValue(val: any): boolean {

		return !!val;

	}

	onPreviewOpen(): void {

		// this.isPreview.set(!this.isPreview());
		this.previewDialogRef = this.dialogService.open(this.previewTemplate);

	}

	onPreviewClose(): void {

		if (this.previewDialogRef)
			this.previewDialogRef.close();

	}

	// @HostListener('keydown', ['$event'])
	onKeydownHandler(event: KeyboardEvent) {

		if (event.key == 'Tab') {

			const replacement = '    '; // instead of '\t'

			event.preventDefault();
			const textarea = this.editor.nativeElement;
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;

			// Insert the '\t' character at the cursor's position
			textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

			// Place the cursor after the inserted '\t' character
			textarea.selectionStart = textarea.selectionEnd = start + replacement.length;

		}

	}

	onInput(event: Event): void {

		const inputElement = event.target as HTMLInputElement;
		const value = inputElement.value;
		this.inputChanged.emit(value);

	}

	addEmptyTask(): void {

		const s = '\n- [ ] ';
		this.updateEditor(s, 'replace');

	}

	async addImage(btn: HTMLButtonElement): Promise<void> {

		const base64 = await this.clipboardService.base64ImageFromClipboard();
		if (base64)
			this.updateEditor(`\n![base64-image](${base64})\n`, 'replace');
		else
			timer(0, 600)
				.pipe(take(2))
				.subscribe({

					next: () => this.btnImageShake.set(true),
					complete: () => this.btnImageShake.set(false)

				});

	}

	addTable(text: string): void {

		this.updateEditor(text, 'replace');
		this.trigger.close();

	}

	addAlignCenter(): void {

		const s = '{.text-align-center}';
		this.updateEditor(s, 'replace');

	}

	addAlignRight(): void {

		const s = '{.text-align-right}';
		this.updateEditor(s, 'replace');

	}

	addAlignJustify(): void {

		const s = '{.text-align-justify}';
		this.updateEditor(s, 'replace');

	}

	addBold(): void {

		const s = '**';
		this.updateEditor(s, 'wrap');

	}

	addItalic(): void {

		const s = '_';
		this.updateEditor(s, 'wrap');

	}

	addStrikethrough(): void {

		const s = '~~';
		this.updateEditor(s, 'wrap');

	}

	addSub(): void {

		const s = '~';
		this.updateEditor(s, 'wrap');

	}

	addSup(): void {

		const s = '^';
		this.updateEditor(s, 'wrap');

	}

	addHighlight(): void {

		const s = '==';
		this.updateEditor(s, 'wrap');

	}

	addInlineCode(): void {

		const s = '`';
		this.updateEditor(s, 'wrap');

	}

	addCodeBlock(lang: string): void {

		// const selectElement = e.target as HTMLSelectElement;
		// const lang = selectElement.value;
		// selectElement.selectedIndex = 0;
		const start = '\n```';
		const end = "\n```";
		const s = start + lang + '\n' + end;
		this.updateEditor(s, 'replace', end.length);

	}

	addBlockquote(type?: 'warning' | 'note' | 'tip' | 'important' | 'caution'): void {

		let start = '';
		switch (type) {

			case 'warning':
				start = '\n\n> [!warning]';
				break;
			case 'note':
				start = '\n\n> [!note]';
				break;
			case 'tip':
				start = '\n\n> [!tip]';
				break;
			case 'important':
				start = '\n\n> [!important]';
				break;
			case 'caution':
				start = '\n\n> [!caution]';
				break;

		}

		let s = start + '\n> \n\n';
		this.updateEditor(s, 'replace', 2);

	}

	private updateEditor(text: string, action: 'replace' | 'wrap', fromEnd: number = 0) {

		const textarea = this.editor.nativeElement;
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;

		if (action === 'replace')
			textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);

		if (action === 'wrap')
			textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(start, end) + text + textarea.value.substring(end);

		textarea.selectionStart = textarea.selectionEnd = start + text.length - fromEnd;
		textarea.focus();

		// manually trigger change, since updates / events are not triggered when DOM is manually updated (?)
		this.control.setValue(this.editor.nativeElement.value);
		this.inputChanged.emit(this.editor.nativeElement.value);

	}

}
