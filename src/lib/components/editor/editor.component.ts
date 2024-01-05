import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
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
	@Input() rows = 20;
	@Input() cols = 20;

	@Output() inputChanged: EventEmitter<string> = new EventEmitter();

	hasValue$!: Observable<boolean>;

	private clipboardService: ClipboardService = inject(ClipboardService);

	ngOnInit(): void {

		this.hasValue$ = this.control.valueChanges.pipe(

			startWith(this.control.value),
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

		const textarea = this.editor.nativeElement;
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;

		textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
		textarea.selectionStart = textarea.selectionEnd = start + text.length;

		// manually trigger change, since updates / events are not triggered when DOM is manually updated (?)
		this.control.setValue(this.editor.nativeElement.value);
		this.inputChanged.emit(this.editor.nativeElement.value);

	}

}
