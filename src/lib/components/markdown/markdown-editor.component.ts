import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkMenuBar, CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, TemplateRef, effect, forwardRef, inject, input, output, signal, untracked, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { GlyphDirective } from '@directives';
import { TimePastPipe } from '@pipes';
import { Subject, debounceTime, distinctUntilChanged, take, timer } from 'rxjs';
import { ClipboardService } from 'services';
import { BaseComponent } from '../base.component';
import { ModalComponent } from '../modal/modal.component';
import { SelectorTableComponent } from '../selector-table/selector-table.component';
import { ButtonActions, C_ASTERISK, C_DASH, C_INDENT, C_LIST_ASTERISK, C_LIST_DASH, C_LIST_PLUS, C_PLUS, C_TAB, C_TASK_COMPL, C_TASK_EMPTY, lineStartsWithOneOf } from './button-actions.util';
import { MarkdownViewerComponent } from './markdown-viewer.component';
import { LSEntry, RECOVERY_MANAGER, RecoveryManager, RecoveryManagerImpl } from './recovery-manager.util';
import { EditorProperties, extractProps } from './textarea-properties.model';
import { UNDO_CACHE, UndoCache, UndoCacheImpl } from './undo-cache.util';

@Component({
	selector: 'w-markdown-editor',
	standalone: true,
	imports: [ GlyphDirective, SelectorTableComponent, MarkdownViewerComponent, TimePastPipe, CdkMenuModule, ModalComponent, ReactiveFormsModule, CommonModule ],
	templateUrl: './markdown-editor.component.html',
	providers: [
		{ provide: UNDO_CACHE, useClass: UndoCacheImpl },
		{ provide: RECOVERY_MANAGER, useClass: RecoveryManagerImpl },
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MarkdownEditorComponent),
			multi: true
		}
	],
	host: {
		'[tabindex]': '0',
		'(focus)': 'onHostFocus()',
		'class': 'relative inline-flex flex-col bg-form-element border border-form-element-border rounded-lg focus-within:ring-4 focus-within:ring-outline w-full focus-within:outline-none'
	}
})
export class MarkdownEditorComponent extends BaseComponent implements ControlValueAccessor {

	// ViewChild
	protected editor = viewChild.required<ElementRef<HTMLTextAreaElement>>('editor');
	protected trigger = viewChild.required<CdkMenuTrigger>(CdkMenuTrigger);
	protected menuBar = viewChild.required<CdkMenuBar>(CdkMenuBar);
	protected previewTemplate = viewChild.required<TemplateRef<HTMLDivElement>>('previewTemplate');
	protected recoverTemplate = viewChild.required<TemplateRef<HTMLDivElement>>('recoverTemplate');

	// Input
	label = input.required<string>();
	rows = input<number>(10);
	readonly = input<boolean>(false);

	// Output
	save = output<string>();
	saveClose = output<string>();
	cancel = output<void>();

	protected value = signal<string>('');
	protected disabled = signal<boolean>(false);
	protected dirty = signal<boolean>(false);

	//////////// boilerplate
	private onChange: any = () => { };
	private onTouched: any = () => { };
	registerOnChange(fn: any): void { this.onChange = fn; }
	registerOnTouched(fn: any): void { this.onTouched = fn; }
	writeValue(value: string): void { this.value.set(value); this.dirty.set(true); }
	setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
	////////////

	// Method that handles the change event of the checkbox
	onInput(value: string): void {

		this.value.set(value);
		this.dirty.set(true);
		this.onChange(value);
		this.onTouched();

	}

	onHostFocus(): void {

		this.editor().nativeElement.focus();

	}

	protected actions = new ButtonActions();
	protected hasFocus = signal<boolean>(false);
	protected btnImageShake = signal<boolean>(false);
	protected btnOpenRecovery = signal<boolean>(false);
	protected buffer = new Subject<string>();

	protected undoCache: UndoCache = inject(UNDO_CACHE);
	protected recoveryManager: RecoveryManager = inject(RECOVERY_MANAGER);
	protected showPreview = signal<boolean>(false);
	protected showRecover = signal<boolean>(false);

	private clipboardService: ClipboardService = inject(ClipboardService);

	constructor() {

		super();
		effect(() => {

			const content = this.value();
			untracked(() => this.buffer.next(content));

		});

		this.buffer.asObservable().pipe(

			debounceTime(400),
			distinctUntilChanged(),
			takeUntilDestroyed()

		).subscribe(

			() => {

				const props = extractProps(this.editor().nativeElement);
				this.undoCache.saveState(props);
				this.recoveryManager.save(props.content);

			}

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

		this.save.emit(this.editor().nativeElement.value);

	}

	onSaveAndClose(): void {

		this.saveClose.emit(this.editor().nativeElement.value);

	}

	onPreviewOpen(): void {

		this.showPreview.set(true);
		// this.previewDialogRef = this.dialogService.open(this.previewTemplate);

	}

	onRecoverOpen(): void {

		this.recoveryManager.init();
		if (this.recoveryManager.recoverableContent())
			this.showRecover.set(true);
		else
			timer(0, 600)
				.pipe(take(2))
				.subscribe({

					next: () => this.btnOpenRecovery.set(true),
					complete: () => this.btnOpenRecovery.set(false)

				});

	}

	onPreviewClose(): void {

		this.showPreview.set(false);
		// if (this.previewDialogRef)
		// 	this.previewDialogRef.close();

	}

	onRecoverClose(): void {

		this.showRecover.set(false);

	}

	onRecoverReplace(): void {

		const lsEntry: LSEntry | null = this.recoveryManager.recoverableContent();
		if (lsEntry) {

			this.updateControl(lsEntry.content);
			this.onRecoverClose();

		}

	}

	@HostListener('keydown', [ '$event' ])
	onKeydownHandler(event: KeyboardEvent) {

		if (!this.hasFocus)
			return;

		if (hasModifierKey(event)) {

			if (hasModifierKey(event, 'shiftKey') && event.key === 'Tab') {

				event.preventDefault();
				const tuple = lineStartsWithOneOf(
					extractProps(this.editor().nativeElement),
					[ C_LIST_ASTERISK, C_LIST_DASH, C_LIST_PLUS ]
				);
				if (tuple && tuple[ 1 ] > 0)
					this.updateEditor(this.actions.decreaseIndent(this.editor().nativeElement));
				else
					this.updateEditor(this.actions.shiftTab(this.editor().nativeElement));


			} else if (hasModifierKey(event, 'ctrlKey') && hasModifierKey(event, 'shiftKey') && event.key.toLowerCase() === 'z') {

				event.preventDefault();
				this.onRedo();

			} else if (hasModifierKey(event, 'ctrlKey') && event.key.toLowerCase() === 'z') {

				event.preventDefault();
				this.onUndo();

			} else if (hasModifierKey(event, 'ctrlKey') && event.key === 'ArrowDown') {

				event.preventDefault();
				this.editor().nativeElement.scrollTop += 30;

			} else if (hasModifierKey(event, 'ctrlKey') && event.key === 'ArrowUp') {

				event.preventDefault();
				this.editor().nativeElement.scrollTop -= 30;

			} else if (hasModifierKey(event, 'ctrlKey') && event.key === 'j') {

				event.preventDefault();
				this.updateEditor(
					this.actions.addCodeBlock(this.editor().nativeElement, 'java')
				);

			}

		} else if (event.key === 'Tab') {

			event.preventDefault();
			const tuple = lineStartsWithOneOf(
				extractProps(this.editor().nativeElement),
				[ C_ASTERISK, C_DASH, C_PLUS, C_LIST_ASTERISK, C_LIST_DASH, C_LIST_PLUS ]
			);
			if (tuple && tuple[ 1 ] > 0)
				this.updateEditor(this.actions.increaseIndent(this.editor().nativeElement));
			else
				this.updateEditor(this.actions.tab(this.editor().nativeElement));

		} else if (event.key === 'Escape') {

			this.hasFocus.set(false);
			this.menuBar().focusFirstItem();

		} else if (event.key === 'Enter') {

			const tuple = lineStartsWithOneOf(
				extractProps(this.editor().nativeElement),
				[ C_TASK_EMPTY, C_TASK_COMPL, C_ASTERISK, C_DASH, C_PLUS, C_LIST_ASTERISK, C_LIST_DASH, C_LIST_PLUS, C_TAB, C_INDENT ],
				[ C_TASK_EMPTY, C_TASK_EMPTY, C_ASTERISK, C_DASH, C_PLUS, C_LIST_ASTERISK, C_LIST_DASH, C_LIST_PLUS, C_TAB, C_INDENT ]
			);
			if (tuple && tuple[ 1 ] > 0) {

				event.preventDefault();
				this.updateEditor(this.actions.addNewLine(this.editor().nativeElement, tuple[ 0 ], tuple[ 1 ]));

			}
			this.editor().nativeElement.scrollLeft = 0;

		}

	}

	updateEditor(props: EditorProperties): void {

		const textarea = this.editor().nativeElement;
		const { content, sIndex, eIndex } = props;

		textarea.value = content;
		textarea.selectionStart = sIndex;
		textarea.selectionEnd = eIndex;
		textarea.focus();

		this.updateControl(content);

	}

	onUndo(): void {

		this.undoCache.undo();
		this.onUndoRedo();

	}

	onRedo(): void {

		this.undoCache.redo();
		this.onUndoRedo();

	}

	private onUndoRedo(): void {

		const props = this.undoCache.props();
		const { content, sIndex, eIndex } = props;

		const textarea = this.editor().nativeElement;
		textarea.value = content;
		textarea.selectionStart = sIndex;
		textarea.selectionEnd = eIndex;
		textarea.focus();

		this.updateControl(content, false);

	}

	private updateControl(content: string, emitEvent: boolean = true): void {

		/* Order Important!
		 * undoCache's initialization depends on the order here:
		 * control continues initializing 'undoCache' until it's 'dirty'.
		 * see: ngOnInit() */
		this.value.set(content);
		this.onChange(this.value());
		this.onTouched();
		// this.control.markAsDirty();
		// this.control.setValue(content, { emitEvent });

	}

	addTable(event: [ number, number ]): void {

		this.actions.addTable(this.editor().nativeElement, event);
		this.trigger().close();

	}

	async addImage(btn: HTMLButtonElement): Promise<void> {

		const base64 = await this.clipboardService.base64ImageFromClipboard();
		if (base64)
			this.updateEditor(this.actions.addImage(this.editor().nativeElement, base64));
		else
			timer(0, 600)
				.pipe(take(2))
				.subscribe({

					next: () => this.btnImageShake.set(true),
					complete: () => this.btnImageShake.set(false)

				});

	}

}
