import { AppEntityType, Click, Configuration, Entity, RemoteMetadata, SyncData, Theme, ToastConfiguration } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const coreActions = createActionGroup({

	source: 'Core',
	events: {

		loadAll						: emptyProps(),
		loadAllSuccess				: props<{

										configuration	: Configuration,
										entities		: {
											entityType: AppEntityType,
											entities: Entity[],
											syncData: SyncData[],
											remoteMetadata: RemoteMetadata[]
										}[],
										clicks			: Click[]

									}>(),

		setBigScreen				: props<{ bigScreen: boolean }>(),
		hideSidebar					: emptyProps(),
		setNextSidebarState			: emptyProps(),

		setTheme					: props<{ theme: Theme }>(),
		setNow						: emptyProps(),

		showNotification			: props<ToastConfiguration>(),

		navigate 					: props<{ url: string[], queryParams?: Record<string, string>, skipLocationChange?: boolean, closeOnNavSuccess?: boolean }>()

	}

});
