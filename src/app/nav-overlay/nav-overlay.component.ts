import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-nav-overlay',
	standalone: true,
	imports: [],
	templateUrl: './nav-overlay.component.html',
	styleUrl: './nav-overlay.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavOverlayComponent {

}
