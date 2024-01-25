import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, take, tap, timer } from 'rxjs';
import { ClipboardService } from 'services';
import { ButtonActions } from './button-actions.util';
import { UndoCache } from './history.util';
import { TextareaProperties } from './textarea-properties.model';

@Component({
	selector: 'w-markdown-editor',
	templateUrl: './markdown-editor.component.html',
	styleUrls: ['./markdown-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('editor') editor!: ElementRef<HTMLTextAreaElement>;
	@ViewChild('btnSaveMenu') btnSaveMenu!: ElementRef<HTMLButtonElement>;
	@ViewChild(CdkMenuTrigger) trigger!: CdkMenuTrigger;
	@ViewChild('previewTemplate') previewTemplate!: TemplateRef<HTMLDivElement>;

	@Input() control!: FormControl<string>;
	@Input() name: string = '';
	@Input() readonly = false;
	@Input() rows = 30;
	@Input() cols = 20;

	@Output() save: EventEmitter<string> = new EventEmitter();
	@Output() saveClose: EventEmitter<string> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	hasFocus: boolean = false;
	undoCache: UndoCache = new UndoCache();
	actions: ButtonActions = new ButtonActions();
	btnImageShake: WritableSignal<boolean> = signal(false);

	private dialogService: Dialog = inject(Dialog);
	private previewDialogRef: DialogRef<null, HTMLDivElement> | null = null;
	private clipboardService: ClipboardService = inject(ClipboardService);

	subscription: Subscription = new Subscription();

	ngOnInit(): void {

		this.subscription = this.control.valueChanges.pipe(

			debounceTime(400),
			distinctUntilChanged(),
			tap(val => this.undoCache.saveState(val, !this.control.dirty))

		).subscribe();

	}

	ngAfterViewInit(): void {

	}

	ngOnDestroy(): void {

		this.subscription.unsubscribe();

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

	check(): void {

		console.log(this.undoCache.idx(), this.undoCache.stack());

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
				this.updateEditor(this.actions.shiftTab(this.editor.nativeElement));


			} else if (hasModifierKey(event, 'ctrlKey') && hasModifierKey(event, 'shiftKey') && event.key.toLowerCase() === 'z') {

				event.preventDefault();
				this.undoCache.redo();

			} else if (hasModifierKey(event, 'ctrlKey') && event.key.toLowerCase() === 'z') {

				event.preventDefault();
				this.undoCache.undo();

			}

		} else if (event.key === 'Tab') {

			event.preventDefault();
			this.updateEditor(this.actions.tab(this.editor.nativeElement));

		} else if (event.key === 'Escape') {

			this.hasFocus = false;
			this.btnSaveMenu.nativeElement.focus();

		}

	}

	updateEditor(props: TextareaProperties): void {

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

		this.control.setValue(content, { emitEvent: false });
		this.control.markAsDirty();

	}

	onUndo(): void {

		this.undoCache.undo();
		this.editor.nativeElement.focus();

	}

	onRedo(): void {

		this.undoCache.redo();
		this.editor.nativeElement.focus();

	}

	addTable(event: [number, number]): void {

		this.actions.addTable(this.editor.nativeElement, event);
		this.trigger.close();

	}

	async addImage(btn: HTMLButtonElement): Promise<void> {

		const base64 = await this.clipboardService.base64ImageFromClipboard();
		if (base64)
			this.updateEditor(this.actions.addImage(this.editor.nativeElement, base64));
		else
			timer(0, 600)
				.pipe(take(2))
				.subscribe({

					next: () => this.btnImageShake.set(true),
					complete: () => this.btnImageShake.set(false)

				});

	}

}
