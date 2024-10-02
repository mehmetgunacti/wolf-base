import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';
import { Learning, LearningStatusLabels, slideDownTrigger } from '@lib';

@Component({
	selector: 'app-learning',
	templateUrl: './learning.component.html',
	styleUrls: ['./learning.component.scss'],
	animations: [slideDownTrigger],
	host: { 'class': 'd-flex-column gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningComponent {

	protected LearningStatusLabels = LearningStatusLabels;

	// @Input
	learning: InputSignal<Learning> = input.required();
	expanded: InputSignal<boolean> = input(false);

	// @Output
	toggleInfo = output<boolean>();

	onToggleInfo(): void {

		this.toggleInfo.emit(!this.expanded());

	}

}
