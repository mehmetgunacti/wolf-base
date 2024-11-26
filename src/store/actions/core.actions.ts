import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { Theme } from '@constants/theme.constant';
import { ToastConfiguration } from '@libComponents/toast/toast.util';
import { Click } from '@models/bookmark.model';
import { Configuration } from '@models/configuration.model';
import { Entity } from '@models/entity.model';
import { RemoteMetadata } from '@models/remote.model';
import { SyncData } from '@models/sync.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const coreActions = createActionGroup({

	source: 'Core',
	events: {

		loadAll						: emptyProps(),
		loadAllSuccess				: props<{

										configuration	: Configuration,
										entities		: {
											entityType: AppEntityType,
											uuids: UUID[],
											entities: Entity[],
											syncData: SyncData[],
											remoteMetadata: RemoteMetadata[]
										}[],
										clicks			: Click[]

									}>(),

		setBigScreen				: props<{ bigScreen: boolean }>(),
		hideSidebar					: emptyProps(),
		setNextSidebarState			: emptyProps(),

		showProgressBar				: emptyProps(),
		hideProgressBar				: emptyProps(),

		setTheme					: props<{ theme: Theme }>(),
		setNextTheme				: emptyProps(),
		setNow						: emptyProps(),

		showNotification			: props<ToastConfiguration>(),

		navigate 					: props<{ url: string[], queryParams?: Record<string, string>, skipLocationChange?: boolean, closeOnNavSuccess?: boolean }>()

	}

});
