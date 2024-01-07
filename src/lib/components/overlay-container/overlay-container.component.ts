import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
	selector: 'w-overlay-container',
	templateUrl: './overlay-container.component.html',
	styleUrls: ['./overlay-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayContainerComponent {

	@Input() content: string | SafeHtml | null | undefined;

}
