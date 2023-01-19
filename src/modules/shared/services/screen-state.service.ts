import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ScreenStateService {

	public navigationVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(eventManager: EventManager) {

		eventManager.addGlobalEventListener(
			'window',
			'resize',
			(e: { target: { innerWidth: number; }; }) => e.target.innerWidth > 767 ? this.navigationVisible.next(false) : null
		);

	}

}
