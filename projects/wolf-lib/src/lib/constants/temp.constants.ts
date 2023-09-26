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
