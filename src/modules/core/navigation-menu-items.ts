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

export const miDatabase: MenuItem = {
	label: 'Database',
	icon: PrimeIcons.DATABASE,
	routerLink: ['/database']
};

export const miSync = (badge?: string): MenuItem => ({
	label: 'Synchronize',
	icon: PrimeIcons.SYNC,
	routerLink: ['/sync'],
	badge,
	styleClass: 'menuBadge orange'
});

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
