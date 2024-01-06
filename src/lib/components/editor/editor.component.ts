import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formatBytes } from 'lib/utils';
import { Observable, map, startWith, tap } from 'rxjs';
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

	@Input() control!: FormControl;
	@Input() name: string = '';
	@Input() readonly = false;
	@Input() rows = 30;
	@Input() cols = 20;

	@Output() inputChanged: EventEmitter<string> = new EventEmitter();


	private contentSize: WritableSignal<number> = signal(0);
	contentSizeString = computed(() => formatBytes(this.contentSize()));

	hasValue$!: Observable<boolean>;

	private clipboardService: ClipboardService = inject(ClipboardService);

	ngOnInit(): void {

		this.hasValue$ = this.control.valueChanges.pipe(

			startWith(this.control.value),
			tap(val => this.contentSize.set(val?.length ?? 0)),
			map(val => this.hasValue(val))

		);

	}

	private hasValue(val: any): boolean {

		return !!val;

	}

	@HostListener('keydown', ['$event'])
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
		this.editorInsert(s);

	}

	async addImage(): Promise<void> {

		const base64 = await this.clipboardService.base64ImageFromClipboard();
		if (base64)
			this.editorInsert(`\n![base64-image](${base64})\n`);

	}

	addTable(text: string): void {

		this.editorInsert(text);
		this.trigger.close();

	}

	editorInsert(text: string) {

		console.log(text.length);


		const textarea = this.editor.nativeElement;
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;

		textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
		textarea.selectionStart = textarea.selectionEnd = start + text.length;
		textarea.focus();

		// manually trigger change, since updates / events are not triggered when DOM is manually updated (?)
		this.control.setValue(this.editor.nativeElement.value);
		this.inputChanged.emit(this.editor.nativeElement.value);

	}

	addAlignCenter(): void {}
	addAlignRight(): void {}
	addAlignJustify(): void {}
	addBold(): void {}
	addItalic(): void {}
	addStrikethrough(): void {}

}
