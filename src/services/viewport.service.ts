import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { Breakpoint } from '@constants/responsive.constant';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ViewportService {

	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

	bigScreen$: Observable<boolean>;

	constructor() {

		this.bigScreen$ = this.breakpointObserver
			.observe(`(min-width: ${Breakpoint.md})`)
			.pipe(map(result => result.matches));

	}

}
