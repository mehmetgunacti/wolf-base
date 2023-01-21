import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Bookmark } from 'lib';

@Component({
	selector: 'app-bookmark-one',
	templateUrl: './bookmark-one.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkOneComponent {

	@Input() bookmark: Bookmark | undefined | null;

}
