import { MenuItem, PrimeIcons } from 'primeng/api';

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

export const miDatabase: MenuItem = {
	label: 'Database',
	icon: PrimeIcons.DATABASE,
	routerLink: ['/database']
};

export const miLogs: MenuItem = {
	label: 'Logs',
	icon: PrimeIcons.LIST,
	routerLink: ['/logs']
};

export const miStats = ([total, errors]: number[]): MenuItem => ({
	label: 'Stats',
	icon: PrimeIcons.CHART_BAR,
	routerLink: ['/stats'],
	badge: errors ? `${errors}/${total}` : total ? `${total}` : '',
	badgeStyleClass: errors ? 'red' : total ? 'orange' : '',
	command: () => console.log('badge', total, errors)
});

export const miSettings: MenuItem = {
	label: 'Settings',
	icon: PrimeIcons.COG,
	routerLink: ['/settings']
};

// export const miNotes: MenuItem = {
// 	label: 'Notes',
// 	icon: 'pi pi-fw fa-bookmark',
// 	routerLink: ['/notes']
// };
// export const miWikis: MenuItem = {
// 	label: 'Wikis',
// 	icon: 'pi pi-fw fa-bookmark',
// 	routerLink: ['/wikis']
// };
// export const miTasks: MenuItem = {
// 	label: 'Tasks',
// 	icon: 'pi pi-fw fa-bookmark',
// 	routerLink: ['/tasks']
// };
// export const miFasts: MenuItem = {
// 	label: 'Fasts',
// 	icon: 'pi pi-fw fa-bookmark',
// 	routerLink: ['/fasts']
// };
// export const miWords: MenuItem = {
// 	label: 'Words',
// 	icon: 'pi pi-fw fa-bookmark',
// 	routerLink: ['/words']
// };
