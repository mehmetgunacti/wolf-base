import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkMenuBar, CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription, debounceTime, distinctUntilChanged, take, timer } from 'rxjs';
import { ClipboardService } from 'services';
import { ButtonActions, C_ASTERISK, C_DASH, C_INDENT, C_LIST_ASTERISK, C_LIST_DASH, C_LIST_PLUS, C_PLUS, C_TAB, C_TASK_COMPL, C_TASK_EMPTY, lineStartsWithOneOf } from './button-actions.util';
import { LSEntry, RECOVERY_MANAGER, RecoveryManager, RecoveryManagerImpl } from './recovery-manager.util';
import { EditorProperties, extractProps } from './textarea-properties.model';
import { UNDO_CACHE, UndoCache, UndoCacheImpl } from './undo-cache.util';

@Component({
	selector: 'w-markdown-editor',
	templateUrl: './markdown-editor.component.html',
	styleUrls: ['./markdown-editor.component.scss'],
	providers: [
		{ provide: UNDO_CACHE, useClass: UndoCacheImpl },
		{ provide: RECOVERY_MANAGER, useClass: RecoveryManagerImpl },
	],
	host: {
		'class': 'flex-1 d-flex-column pos-relative gap'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent implements OnInit, OnDestroy {

	@ViewChild('editor') editor!: ElementRef<HTMLTextAreaElement>;
	@ViewChild(CdkMenuTrigger) trigger!: CdkMenuTrigger;
	@ViewChild(CdkMenuBar) menuBar!: CdkMenuBar;
	@ViewChild('previewTemplate') previewTemplate!: TemplateRef<HTMLDivElement>;
	@ViewChild('recoverTemplate') recoverTemplate!: TemplateRef<HTMLDivElement>;

	@Input({ required: true }) control!: FormControl<string>;
	@Input() name: string = '';
	@Input() readonly = false;

	@Output() save: EventEmitter<string> = new EventEmitter();
	@Output() saveClose: EventEmitter<string> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	hasFocus: WritableSignal<boolean> = signal(false);
	actions: ButtonActions = new ButtonActions();
	btnImageShake: WritableSignal<boolean> = signal(false);
	btnOpenRecovery: WritableSignal<boolean> = signal(false);
	buffer: Subject<string> = new Subject();

	undoCache: UndoCache = inject(UNDO_CACHE);
	recoveryManager: RecoveryManager = inject(RECOVERY_MANAGER);
	private dialogService: Dialog = inject(Dialog);
	private previewDialogRef: DialogRef<null, HTMLDivElement> | null = null;
	private recoverDialogRef: DialogRef<null, HTMLDivElement> | null = null;
	private clipboardService: ClipboardService = inject(ClipboardService);

	private subscriptions: Subscription = new Subscription();

	ngOnInit(): void {

		this.subscriptions.add(

			this.buffer.asObservable().pipe(

				debounceTime(400),
				distinctUntilChanged()

			).subscribe(

				() => {

					const props = extractProps(this.editor.nativeElement);
					this.undoCache.saveState(props);
					this.recoveryManager.save(props.content);

				}

			)

		);

		this.subscriptions.add(

			this.control.valueChanges.subscribe(

				content => {

					if (this.control.pristine) // first value from db
						this.undoCache.initialize(content);
					else
						this.buffer.next(content);

				}

			)

		);

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();

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

	onRecoverOpen(): void {

		this.recoveryManager.init();
		if (this.recoveryManager.recoverableContent())
			this.recoverDialogRef = this.dialogService.open(this.recoverTemplate);
		else
			timer(0, 600)
				.pipe(take(2))
				.subscribe({

					next: () => this.btnOpenRecovery.set(true),
					complete: () => this.btnOpenRecovery.set(false)

				});

	}

	onPreviewClose(): void {

		if (this.previewDialogRef)
			this.previewDialogRef.close();

	}

	onRecoverClose(): void {

		if (this.recoverDialogRef)
			this.recoverDialogRef.close();

	}

	onRecoverReplace(): void {

		const lsEntry: LSEntry | null = this.recoveryManager.recoverableContent();
		if (lsEntry) {

			this.updateControl(lsEntry.content);
			this.recoverDialogRef?.close();

		}

	}

	@HostListener('keydown', ['$event'])
	onKeydownHandler(event: KeyboardEvent) {

		if (!this.hasFocus)
			return;

		if (hasModifierKey(event)) {

			if (hasModifierKey(event, 'shiftKey') && event.key === 'Tab') {

				event.preventDefault();
				const tuple = lineStartsWithOneOf(
					extractProps(this.editor.nativeElement),
					[C_LIST_ASTERISK, C_LIST_DASH, C_LIST_PLUS]
				)
				if (tuple && tuple[1] > 0)
					this.updateEditor(this.actions.decreaseIndent(this.editor.nativeElement));
				else
					this.updateEditor(this.actions.shiftTab(this.editor.nativeElement));


			} else if (hasModifierKey(event, 'ctrlKey') && hasModifierKey(event, 'shiftKey') && event.key.toLowerCase() === 'z') {

				event.preventDefault();
				this.onRedo();

			} else if (hasModifierKey(event, 'ctrlKey') && event.key.toLowerCase() === 'z') {

				event.preventDefault();
				this.onUndo();

			} else if (hasModifierKey(event, 'ctrlKey') && event.key === 'ArrowDown') {

				event.preventDefault();
				this.editor.nativeElement.scrollTop += 30;

			} else if (hasModifierKey(event, 'ctrlKey') && event.key === 'ArrowUp') {

				event.preventDefault();
				this.editor.nativeElement.scrollTop -= 30;

			} else if (hasModifierKey(event, 'ctrlKey') && event.key === 'j') {

				event.preventDefault();
				this.updateEditor(
					this.actions.addCodeBlock(this.editor.nativeElement, 'java')
				);

			}

		} else if (event.key === 'Tab') {

			event.preventDefault();
			const tuple = lineStartsWithOneOf(
				extractProps(this.editor.nativeElement),
				[C_ASTERISK, C_DASH, C_PLUS, C_LIST_ASTERISK, C_LIST_DASH, C_LIST_PLUS]
			)
			if (tuple && tuple[1] > 0)
				this.updateEditor(this.actions.increaseIndent(this.editor.nativeElement));
			else
				this.updateEditor(this.actions.tab(this.editor.nativeElement));

		} else if (event.key === 'Escape') {

			this.hasFocus.set(false);
			this.menuBar.focusFirstItem();

		} else if (event.key === 'Enter') {

			const tuple = lineStartsWithOneOf(
				extractProps(this.editor.nativeElement),
				[C_TASK_EMPTY, C_TASK_COMPL, C_ASTERISK, C_DASH, C_PLUS, C_LIST_ASTERISK, C_LIST_DASH, C_LIST_PLUS, C_TAB, C_INDENT],
				[C_TASK_EMPTY, C_TASK_EMPTY, C_ASTERISK, C_DASH, C_PLUS, C_LIST_ASTERISK, C_LIST_DASH, C_LIST_PLUS, C_TAB, C_INDENT]
			);
			if (tuple && tuple[1] > 0) {

				event.preventDefault();
				this.updateEditor(this.actions.addNewLine(this.editor.nativeElement, tuple[0], tuple[1]));

			}
			this.editor.nativeElement.scrollLeft = 0;

		}

	}

	updateEditor(props: EditorProperties): void {

		const textarea = this.editor.nativeElement;
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
		const textarea = this.editor.nativeElement;

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
		this.control.markAsDirty();
		this.control.setValue(content, { emitEvent });

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
