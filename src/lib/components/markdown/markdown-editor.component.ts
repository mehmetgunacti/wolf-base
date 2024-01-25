import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription, debounceTime, distinctUntilChanged, take, tap, timer } from 'rxjs';
import { ClipboardService } from 'services';
import { ButtonActions } from './button-actions.util';
import { EditorProperties, extractProps } from './textarea-properties.model';
import { UndoCache } from './undo-cache.util';

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

	@Input({ required: true }) control!: FormControl<string>;
	@Input() name: string = '';
	@Input() readonly = false;

	@Output() save: EventEmitter<string> = new EventEmitter();
	@Output() saveClose: EventEmitter<string> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	hasFocus: boolean = false;
	undoCache: UndoCache = new UndoCache();
	actions: ButtonActions = new ButtonActions();
	btnImageShake: WritableSignal<boolean> = signal(false);
	buffer: Subject<string> = new Subject();

	private dialogService: Dialog = inject(Dialog);
	private previewDialogRef: DialogRef<null, HTMLDivElement> | null = null;
	private clipboardService: ClipboardService = inject(ClipboardService);

	private subscriptions: Subscription = new Subscription();

	ngOnInit(): void {

		this.subscriptions.add(

			this.buffer.asObservable().pipe(

				debounceTime(400),
				distinctUntilChanged(),
				tap(() => this.undoCache.saveState(extractProps(this.editor.nativeElement)))

			).subscribe()

		);

		this.subscriptions.add(

			this.control.valueChanges.pipe(

				tap(content => {

					if (!this.control.dirty) // first value from db
						this.undoCache.initialize(content)
					this.buffer.next(content);

				})

			).subscribe()

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
				// this.onRedo();
				this.editor.nativeElement.selectionStart = 88;
				this.editor.nativeElement.selectionEnd = 90;

			} else if (hasModifierKey(event, 'ctrlKey') && event.key.toLowerCase() === 'z') {

				event.preventDefault();
				// this.onUndo();
				const { value, selectionStart, selectionEnd, selectionDirection } = this.editor.nativeElement;
				console.log(selectionStart, selectionEnd, selectionDirection);
				console.log('start + 1', value.substring(selectionStart, selectionStart + 1));
				console.log('end + 1', value.substring(selectionEnd, selectionEnd + 1));



			}

		} else if (event.key === 'Tab') {

			event.preventDefault();
			this.updateEditor(this.actions.tab(this.editor.nativeElement));

		} else if (event.key === 'Escape') {

			this.hasFocus = false;
			this.btnSaveMenu.nativeElement.focus();

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
