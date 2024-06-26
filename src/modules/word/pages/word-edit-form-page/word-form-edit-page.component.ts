import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-word-edit-form-page',
	templateUrl: './word-form-edit-page.component.html',
	styleUrls: ['./word-form-edit-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordEditFormPageComponent { }
