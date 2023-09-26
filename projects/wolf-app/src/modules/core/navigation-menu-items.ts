import { MenuItem, WolfIcons } from '@lib';

export const miHome: MenuItem = {
	label: 'Home',
	icon: WolfIcons.HOME,
	routerLink: [''],
	routerLinkActiveOptions: { exact: true }
};

export const miBookmarks = (badge: string): MenuItem => ({
	label: 'Bookmarks',
	icon: WolfIcons.BOOKMARK,
	routerLink: ['/bookmarks'],
	queryParams: { tags: 'popular' },
	badge,
	styleClass: 'menuBadge'
});

export const miKnowledgeBase: MenuItem = {
	label: 'Knowledge Base',
	icon: WolfIcons.SITEMAP,
	routerLink: ['/kb']
};

// export const miDatabase: MenuItem = {
// 	label: 'Database',
// 	icon: WolfIcons.DATABASE,
// 	routerLink: ['/database']
// };

export const miLogs: MenuItem = {
	label: 'Logs',
	icon: WolfIcons.LIST,
	routerLink: ['/logs']
};

export const miCloud = ([total, errors]: number[]): MenuItem => ({
	label: 'Cloud Sync',
	icon: WolfIcons.SYNC,
	routerLink: ['/cloud'],
	badge: errors ? `${errors}/${total}` : total ? `${total}` : '',
	badgeStyleClass: errors ? 'red' : total ? 'orange' : '',
	command: () => console.log('badge', total, errors)
});

export const miSettings: MenuItem = {
	label: 'Settings',
	icon: WolfIcons.COG,
	routerLink: ['/settings']
};
