import { IsActiveMatchOptions } from '@angular/router';
import { GlyphName } from '@constants';

export interface MenuItem {

	url: string[];
	queryParams?: Record<string, string>;
	routerLinkActiveOptions?: { exact: boolean; } | IsActiveMatchOptions,
	label: string;
	icon: GlyphName;
	badge?: string;
	title?: string;

}
