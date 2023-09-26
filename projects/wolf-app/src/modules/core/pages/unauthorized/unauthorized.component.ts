import { Component } from '@angular/core';

@Component({
	selector: 'app-unauthorized',
	template: `
		<div style="font-size: xx-large;">
			<i class="pi pi-user-lock"></i> 403 Unauthorized
		</div>
	`
})
export class UnauthorizedComponent { }
