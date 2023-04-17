import { MenuItem, PrimeIcons } from 'primeng/api';

// export const miHome = (tx: any): MenuItem => ({
// 	label: tx['home'],
// 	icon: PrimeIcons.HOME,
// 	routerLink: [''],
// 	routerLinkActiveOptions: { exact: true }
// });

export const miBookmarks: MenuItem = {
	label: 'Bookmarks',
	icon: PrimeIcons.BOOKMARK_FILL,
	routerLink: ['/bookmarks']
};

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
