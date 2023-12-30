import { IsActiveMatchOptions } from '@angular/router';

export interface MenuItem {

	url: string[];
	queryParams?: Record<string, string>;
	routerLinkActiveOptions?: { exact: boolean; } | IsActiveMatchOptions,
	label: string;
	icon?: string;
	badge?: string;

}
