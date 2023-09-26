import { MenuItem, PrimeIcons } from '@lib';

export const miHome: MenuItem = {
	label: 'Home',
	icon: PrimeIcons.HOME,
	routerLink: [''],
	routerLinkActiveOptions: { exact: true }
};

export const miBookmarks = (badge: string): MenuItem => ({
	label: 'Bookmarks',
	icon: PrimeIcons.BOOKMARK,
	routerLink: ['/bookmarks'],
	queryParams: { tags: 'popular' },
	badge,
	styleClass: 'menuBadge'
});

export const miKnowledgeBase: MenuItem = {
	label: 'Knowledge Base',
	icon: PrimeIcons.SITEMAP,
	routerLink: ['/kb']
};

// export const miDatabase: MenuItem = {
// 	label: 'Database',
// 	icon: PrimeIcons.DATABASE,
// 	routerLink: ['/database']
// };

export const miLogs: MenuItem = {
	label: 'Logs',
	icon: PrimeIcons.LIST,
	routerLink: ['/logs']
};

export const miCloud = ([total, errors]: number[]): MenuItem => ({
	label: 'Cloud Sync',
	icon: PrimeIcons.SYNC,
	routerLink: ['/cloud'],
	badge: errors ? `${errors}/${total}` : total ? `${total}` : '',
	badgeStyleClass: errors ? 'red' : total ? 'orange' : '',
	command: () => console.log('badge', total, errors)
});

export const miSettings: MenuItem = {
	label: 'Settings',
	icon: PrimeIcons.COG,
	routerLink: ['/settings']
};
