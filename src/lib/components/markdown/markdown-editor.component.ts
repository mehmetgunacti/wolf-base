import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formatBytes } from 'lib/utils';
import { Observable, map, startWith, take, tap, timer } from 'rxjs';
import { ClipboardService } from 'services';
import * as tool from './markdown-editor.tool';
import { TextareaProperties } from './markdown-editor.tool';

@Component({
	selector: 'w-markdown-editor',
	templateUrl: './markdown-editor.component.html',
	styleUrls: ['./markdown-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent implements OnInit {

	@ViewChild('editor') editor!: ElementRef<HTMLTextAreaElement>;
	@ViewChild('btnSaveMenu') btnSaveMenu!: ElementRef<HTMLButtonElement>;
	@ViewChild(CdkMenuTrigger) trigger!: CdkMenuTrigger;
	@ViewChild('previewTemplate') previewTemplate!: TemplateRef<HTMLDivElement>;

	@Input() control!: FormControl;
	@Input() name: string = '';
	@Input() readonly = false;
	@Input() rows = 30;
	@Input() cols = 20;

	@Output() inputChanged: EventEmitter<string> = new EventEmitter();
	@Output() save: EventEmitter<string> = new EventEmitter();
	@Output() saveClose: EventEmitter<string> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	content: WritableSignal<string | null> = signal(null);
	contentSizeString = computed(() => formatBytes(this.content()?.length ?? 0));


	// isPreview: WritableSignal<boolean> = signal(false);
	btnImageShake: WritableSignal<boolean> = signal(false);

	hasValue$!: Observable<boolean>;
	hasFocus: boolean = false;

	private clipboardService: ClipboardService = inject(ClipboardService);
	private dialogService: Dialog = inject(Dialog);
	private previewDialogRef: DialogRef<null, HTMLDivElement> | null = null;

	ngOnInit(): void {


		this.hasValue$ = this.control.valueChanges.pipe(

			startWith(this.control.value),
			tap(val => this.content.set(val)),
			map(val => !!val)

		);

	}

	onCancel(warn: boolean): void {

		if (warn) {
			if (confirm(`Discard changes?`))
				this.cancel.emit();
		} else
			this.cancel.emit();

	}

	onSave(): void {

		this.save.emit(this.editor.nativeElement.value);

	}

	onSaveAndClose(): void {

		this.saveClose.emit(this.editor.nativeElement.value);

	}

	onPreviewOpen(): void {

		this.previewDialogRef = this.dialogService.open(this.previewTemplate);

	}

	onPreviewClose(): void {

		if (this.previewDialogRef)
			this.previewDialogRef.close();

	}

	@HostListener('keydown', ['$event'])
	onKeydownHandler(event: KeyboardEvent) {

		if (!this.hasFocus)
			return;

		if (hasModifierKey(event)) {

			if (hasModifierKey(event, 'shiftKey') && event.key === 'Tab') {

				event.preventDefault();
				this.updateEditor(
					tool.shiftTab(this.editor.nativeElement)
				);

			}

		} else if (event.key === 'Tab') {

			event.preventDefault();
			this.updateEditor(
				tool.tab(this.editor.nativeElement)
			);

		} else if (event.key === 'Escape') {

			this.hasFocus = false;
			this.btnSaveMenu.nativeElement.focus();

		}

	}

	onFocus(): void {

		this.hasFocus = true;

	}

	onBlur(): void {

		this.hasFocus = false;

	}

	onInput(event: Event): void {

		const inputElement = event.target as HTMLInputElement;
		const value = inputElement.value;
		this.inputChanged.emit(value);

	}

	async addImage(btn: HTMLButtonElement): Promise<void> {

		const base64 = await this.clipboardService.base64ImageFromClipboard();
		if (base64)
			this.updateEditor(tool.addImage(this.editor.nativeElement, base64));
		else
			timer(0, 600)
				.pipe(take(2))
				.subscribe({

					next: () => this.btnImageShake.set(true),
					complete: () => this.btnImageShake.set(false)

				});

	}

	addHeading(heading: string): void {

		this.updateEditor(
			tool.addHeading(this.editor.nativeElement, heading)
		);

	}

	addBold(): void {

		this.updateEditor(
			tool.addBold(this.editor.nativeElement)
		);

	}

	addItalic(): void {

		this.updateEditor(
			tool.addItalic(this.editor.nativeElement)
		);

	}

	addStrikethrough(): void {

		this.updateEditor(
			tool.addStrikethrough(this.editor.nativeElement)
		);

	}

	addAlignCenter(): void {

		this.updateEditor(
			tool.addAlignCenter(this.editor.nativeElement)
		);

	}

	addAlignRight(): void {

		this.updateEditor(
			tool.addAlignRight(this.editor.nativeElement)
		);

	}

	addAlignJustify(): void {

		this.updateEditor(
			tool.addAlignJustify(this.editor.nativeElement)
		);

	}

	addSub(): void {

		this.updateEditor(
			tool.addSub(this.editor.nativeElement)
		);

	}

	addSup(): void {

		this.updateEditor(
			tool.addSup(this.editor.nativeElement)
		);

	}

	addHighlight(): void {

		this.updateEditor(
			tool.addHighlight(this.editor.nativeElement)
		);

	}

	addBlockquote(type?: 'warning' | 'note' | 'tip' | 'important' | 'caution'): void {

		this.updateEditor(
			tool.addBlockquote(this.editor.nativeElement, type)
		);

	}

	addInlineCode(): void {

		this.updateEditor(
			tool.addInlineCode(this.editor.nativeElement)
		);

	}

	addCodeBlock(lang?: string): void {

		this.updateEditor(
			tool.addCodeBlock(this.editor.nativeElement, lang)
		);

	}

	addListNumbered(): void {

		this.updateEditor(
			tool.addListNumbered(this.editor.nativeElement)
		);

	}

	addDecreaseIndent(): void {

		this.updateEditor(
			tool.addDecreaseIndent(this.editor.nativeElement)
		);

	}

	addIncreaseIndent(): void {

		this.updateEditor(
			tool.addIncreaseIndent(this.editor.nativeElement)
		);

	}

	addListBulleted(): void {

		this.updateEditor(
			tool.addListBulleted(this.editor.nativeElement)
		);

	}

	addTable(event: [number, number]): void {

		this.updateEditor(
			tool.addTable(this.editor.nativeElement, event)
		);

	}

	addToc(): void {

		this.updateEditor(
			tool.addToc(this.editor.nativeElement)
		);

	}


	addEmptyTask(): void {

		this.updateEditor(
			tool.addEmptyTask(this.editor.nativeElement)
		);

	}

	private updateEditor(props: TextareaProperties): void {

		const textarea = this.editor.nativeElement;
		const { value, selectionStart, selectionEnd } = props;

		textarea.value = value;
		textarea.selectionStart = selectionStart;
		textarea.selectionEnd = selectionEnd;
		textarea.focus();

		// manually trigger change, since updates / events are not triggered when DOM is manually updated (?)
		this.control.setValue(this.editor.nativeElement.value);
		this.control.markAsDirty();
		this.inputChanged.emit(this.editor.nativeElement.value);

	}

}
