import { TAG_PINNED, TAG_POPULAR } from '@constants/bookmark.constant';
import { CLOSE_MENU } from '@constants/sidebar.constant';
import { CloudTask } from '@models/cloud.model';
import { MenuItem } from '@models/menu.model';

export const miHome: MenuItem = {
	url: [ '/' ],
	queryParams: { [ CLOSE_MENU ]: 'true' },
	label: 'Home',
	icon: 'home',
	routerLinkActiveOptions: { exact: true }
};

export const miBookmark = ([ total, filtered ]: [ number, number ]): MenuItem => ({
	url: [ '/bookmarks' ],
	queryParams: { tags: TAG_POPULAR, [ CLOSE_MENU ]: 'true' },
	label: 'Bookmarks',
	icon: 'bookmarks',
	badge: filtered === 0 ? `${total}` : filtered < total ? `${filtered} / ${total}` : `${total}`,
	routerLinkActiveOptions: { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
});

export const miNote: MenuItem = {
	url: [ '/notes' ],
	queryParams: { tags: TAG_PINNED, [ CLOSE_MENU ]: 'true' },
	label: 'Notes',
	icon: 'note_stack',
	routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
};

export const miProject: MenuItem = {
	url: [ '/projects' ],
	queryParams: { [ CLOSE_MENU ]: 'true' },
	label: 'Projects',
	icon: 'task_alt',
	routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
};

export const miWord: MenuItem = {
	url: [ '/words' ],
	queryParams: { [ CLOSE_MENU ]: 'true' },
	label: 'Words',
	icon: 'dictionary',
	routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
};

export const miAnswer: MenuItem = {
	url: [ '/answers' ],
	queryParams: { [ CLOSE_MENU ]: 'true' },
	label: 'Exam Prep',
	icon: 'school',
	routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
};

export const miCloud = (cloudTasks: CloudTask[]): MenuItem => ({
	url: [ '/cloud' ],
	queryParams: { [ CLOSE_MENU ]: 'true' },
	label: 'Cloud Sync',
	icon: 'cloud_sync',
	routerLinkActiveOptions: { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' },
	title: cloudTasks.length > 0 ? cloudTasks.length + ' syncable items available' : 'Cloud',
	badge: `${cloudTasks.length}`,
	smallBadge: cloudTasks.length > 0 ? `${cloudTasks.length}` : undefined
});

export const miSetting: MenuItem = {
	url: [ '/settings' ],
	queryParams: { [ CLOSE_MENU ]: 'true' },
	label: 'Settings',
	icon: 'settings',
	routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
};

export const miDatabase: MenuItem = {
	url: [ '/database' ],
	queryParams: { [ CLOSE_MENU ]: 'true' },
	label: 'Database',
	icon: 'database',
	routerLinkActiveOptions: { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
};

export const miLog: MenuItem = {
	url: [ '/logs' ],
	queryParams: { [ CLOSE_MENU ]: 'true' },
	label: 'View Logs',
	icon: 'history',
	routerLinkActiveOptions: { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
};

// export const miTheme = (fn: () => void): MenuItem => ({
// 	url: [ '#' ],
// 	label: 'Switch Theme',
// 	icon: 'colors',
// 	fn
// });
