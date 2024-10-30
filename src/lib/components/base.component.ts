import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	template: '',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class BaseComponent { }
