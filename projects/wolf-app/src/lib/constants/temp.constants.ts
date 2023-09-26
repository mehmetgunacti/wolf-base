export enum PrimeIcons {

	CHECK_CIRCLE = 'CHECK_CIRCLE',
	MEGAPHONE = 'MEGAPHONE',
	EXCLAMATION_CIRCLE = 'EXCLAMATION_CIRCLE',
	EXCLAMATION_TRIANGLE = 'EXCLAMATION_TRIANGLE',
    ANGLE_RIGHT = 'ANGLE_RIGHT',
    HOME = 'HOME',
    BOOKMARK = 'BOOKMARK',
    SITEMAP = 'SITEMAP',
    LIST = 'LIST',
    SYNC = 'SYNC',
    COG = 'COG'

}

export interface MenuItem {

    key?: string,
    label?: string,
    icon?: string,
    routerLink?: string | string[],
    routerLinkActiveOptions?: any,
    queryParams?: any,
    badge?: any,
    styleClass?: string,
    badgeStyleClass?: string,
    command?: () => void



}

export interface TreeNode {

    key?: string,
    label?: string,
    children?: any

}