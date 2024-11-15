import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'w-overlay-container',
	standalone: true,
	templateUrl: './overlay-container.component.html'
})
export class OverlayContainerComponent extends BaseComponent {

	@Input() content: string | SafeHtml | null | undefined;

}
