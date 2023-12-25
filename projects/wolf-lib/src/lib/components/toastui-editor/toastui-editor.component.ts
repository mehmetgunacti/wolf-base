import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, forkJoin, from, map, startWith, switchMap } from 'rxjs';
import { DOMService } from 'services';

@Component({
	selector: 'w-toastui-editor',
	templateUrl: './toastui-editor.component.html',
	styleUrls: ['./toastui-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastUIEditorComponent implements OnInit {

	@Input() control!: FormControl;
	@Input() name: string = '';
	@Input() readonly = false;
	@Input() rows = 20;
	@Input() cols = 20;
	@Input() styleUrls: string[] = [];
	@Input() scriptUrls: string[] = [];

	@Output() inputChanged: EventEmitter<string> = new EventEmitter();

	private domService: DOMService = inject(DOMService);

	editor: any;
	hasValue$!: Observable<boolean>;

	ngOnInit(): void {

		this.hasValue$ = this.control.valueChanges.pipe(

			startWith(this.control.value),
			map(val => this.hasValue(val))

		);

	}

	ngAfterViewInit(): void {

		forkJoin([

			from(this.styleUrls).pipe(
				switchMap(url => this.domService.appendLinkToHead(url))
			),
			from(this.scriptUrls).pipe(
				switchMap(url => this.domService.appendScriptToBody(url))
			)

		]).subscribe({

			next: (a) => console.log(a),
			complete: () => {

				console.log('complete');

			},
			error: (err) => console.error(err)

		});

	}

	private hasValue(val: any): boolean {

		return !!val;

	}

	onInput(event: Event): void {

		const inputElement = event.target as HTMLInputElement;
		const value = inputElement.value;

		this.inputChanged.emit(value);

	}

}
