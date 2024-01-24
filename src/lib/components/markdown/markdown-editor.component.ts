import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, map, take, tap, timer } from 'rxjs';
import { ClipboardService } from 'services';
import * as helper from './markdown-editor.tool';
import { TextareaProperties } from './markdown-editor.tool';

@Component({
	selector: 'w-markdown-editor',
	templateUrl: './markdown-editor.component.html',
	styleUrls: ['./markdown-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent implements OnInit, OnDestroy {

	@ViewChild('editor') editor!: ElementRef<HTMLTextAreaElement>;
	@ViewChild('btnSaveMenu') btnSaveMenu!: ElementRef<HTMLButtonElement>;
	@ViewChild(CdkMenuTrigger) trigger!: CdkMenuTrigger;
	@ViewChild('previewTemplate') previewTemplate!: TemplateRef<HTMLDivElement>;

	@Input() control!: FormControl<string>;
	@Input() name: string = '';
	@Input() readonly = false;
	@Input() rows = 30;
	@Input() cols = 20;

	// @Output() inputChanged: EventEmitter<string> = new EventEmitter();
	@Output() save: EventEmitter<string> = new EventEmitter();
	@Output() saveClose: EventEmitter<string> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	// isPreview: WritableSignal<boolean> = signal(false);
	btnImageShake: WritableSignal<boolean> = signal(false);
	hasFocus: boolean = false;
	history: helper.History = new helper.History();

	private clipboardService: ClipboardService = inject(ClipboardService);
	private dialogService: Dialog = inject(Dialog);
	private previewDialogRef: DialogRef<null, HTMLDivElement> | null = null;

	subscription: Subscription = new Subscription();

	ngOnInit(): void {

		this.subscription = this.control.valueChanges.pipe(

			debounceTime(400),
			distinctUntilChanged(),
			tap(val => this.history.saveState(val, !this.control.dirty))

		).subscribe();

	}

	onInput(event: Event): void {

		const textarea = event.target as HTMLInputElement;
		const content = textarea.value;

		/* Order important: first empty string has to be replaced with actual content
		*  onInput() content comes from textarea, but control.valueChanges also emits once
		*  data arrives from database (initial) */
		this.control.markAsDirty();
		this.control.setValue(content);

	}

	ngOnDestroy(): void {

		this.subscription.unsubscribe();

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

	onUndo(): void {

		this.history.undo();
		this.editor.nativeElement.focus();

	}

	onRedo(): void {

		this.history.redo();
		this.editor.nativeElement.focus();

	}

	check(): void {

		console.log(this.history.idx(), this.history.stack());

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
					helper.shiftTab(this.editor.nativeElement)
				);

			} else if (hasModifierKey(event, 'ctrlKey') && hasModifierKey(event, 'shiftKey') && event.key.toLowerCase() === 'z') {

				event.preventDefault();
				this.history.redo();

			} else if (hasModifierKey(event, 'ctrlKey') && event.key.toLowerCase() === 'z') {

				event.preventDefault();
				this.history.undo();

			}



		} else if (event.key === 'Tab') {

			event.preventDefault();
			this.updateEditor(
				helper.tab(this.editor.nativeElement)
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

	async addImage(btn: HTMLButtonElement): Promise<void> {

		const base64 = await this.clipboardService.base64ImageFromClipboard();
		if (base64)
			this.updateEditor(helper.addImage(this.editor.nativeElement, base64));
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
			helper.addHeading(this.editor.nativeElement, heading)
		);

	}

	addBold(): void {

		this.updateEditor(
			helper.addBold(this.editor.nativeElement)
		);

	}

	addItalic(): void {

		this.updateEditor(
			helper.addItalic(this.editor.nativeElement)
		);

	}

	addStrikethrough(): void {

		this.updateEditor(
			helper.addStrikethrough(this.editor.nativeElement)
		);

	}

	addAlignCenter(): void {

		this.updateEditor(
			helper.addAlignCenter(this.editor.nativeElement)
		);

	}

	addAlignRight(): void {

		this.updateEditor(
			helper.addAlignRight(this.editor.nativeElement)
		);

	}

	addAlignJustify(): void {

		this.updateEditor(
			helper.addAlignJustify(this.editor.nativeElement)
		);

	}

	addSub(): void {

		this.updateEditor(
			helper.addSub(this.editor.nativeElement)
		);

	}

	addSup(): void {

		this.updateEditor(
			helper.addSup(this.editor.nativeElement)
		);

	}

	addHighlight(): void {

		this.updateEditor(
			helper.addHighlight(this.editor.nativeElement)
		);

	}

	addBlockquote(type?: 'warning' | 'note' | 'tip' | 'important' | 'caution'): void {

		this.updateEditor(
			helper.addBlockquote(this.editor.nativeElement, type)
		);

	}

	addInlineCode(): void {

		this.updateEditor(
			helper.addInlineCode(this.editor.nativeElement)
		);

	}

	addCodeBlock(lang?: string): void {

		this.updateEditor(
			helper.addCodeBlock(this.editor.nativeElement, lang)
		);

	}

	addListNumbered(): void {

		this.updateEditor(
			helper.addListNumbered(this.editor.nativeElement)
		);

	}

	addDecreaseIndent(): void {

		this.updateEditor(
			helper.addDecreaseIndent(this.editor.nativeElement)
		);

	}

	addIncreaseIndent(): void {

		this.updateEditor(
			helper.addIncreaseIndent(this.editor.nativeElement)
		);

	}

	addListBulleted(): void {

		this.updateEditor(
			helper.addListBulleted(this.editor.nativeElement)
		);

	}

	addTable(event: [number, number]): void {

		this.updateEditor(
			helper.addTable(this.editor.nativeElement, event)
		);
		this.trigger.close();

	}

	addToc(): void {

		this.updateEditor(
			helper.addToc(this.editor.nativeElement)
		);

	}


	addEmptyTask(): void {

		this.updateEditor(
			helper.addEmptyTask(this.editor.nativeElement)
		);

	}

	private updateEditor(props: TextareaProperties): void {

		const textarea = this.editor.nativeElement;
		const { value, selectionStart, selectionEnd } = props;

		textarea.value = value;
		textarea.selectionStart = selectionStart;
		textarea.selectionEnd = selectionEnd;
		textarea.focus();

		this.setNewValue(value);

	}

	private setNewValue(content: string): void {
		console.log(content);

		this.control.setValue(content);
		this.control.markAsDirty();

	}

}
