import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

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

	}

}
