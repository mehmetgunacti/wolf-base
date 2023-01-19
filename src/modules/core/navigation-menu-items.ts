import { MenuItem } from 'primeng/api';

export const miHome = (tx: any): MenuItem => ({
	label: tx['home'],
	icon: 'fas fa-fw fa-home',
	routerLink: [''],
	routerLinkActiveOptions: { exact: true }
});

export const miBookmarks: MenuItem = {
	label: 'Bookmarks',
	icon: 'fas fa-fw fa-bookmark',
	routerLink: ['/bookmarks']
};
// export const miNotes: MenuItem = {
// 	label: 'Notes',
// 	icon: 'fas fa-fw fa-bookmark',
// 	routerLink: ['/notes']
// };
// export const miWikis: MenuItem = {
// 	label: 'Wikis',
// 	icon: 'fas fa-fw fa-bookmark',
// 	routerLink: ['/wikis']
// };
// export const miTasks: MenuItem = {
// 	label: 'Tasks',
// 	icon: 'fas fa-fw fa-bookmark',
// 	routerLink: ['/tasks']
// };
// export const miFasts: MenuItem = {
// 	label: 'Fasts',
// 	icon: 'fas fa-fw fa-bookmark',
// 	routerLink: ['/fasts']
// };
// export const miWords: MenuItem = {
// 	label: 'Words',
// 	icon: 'fas fa-fw fa-bookmark',
// 	routerLink: ['/words']
// };
