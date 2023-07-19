import { createAction, props } from '@ngrx/store';
import { Configuration, FirestoreConfig, ToastConfiguration } from 'lib';


export class CoreActions {

    static confChanged = createAction('[Configuration] Configuration Changed', props<{ configuration: Configuration }>());
    static saveFirestoreConfig = createAction('[Configuration] Save Firestore Config', props<{ config: FirestoreConfig }>());
    static saveFirestoreConfigSuccess = createAction('[Configuration] Save Firestore Config Success');

    static Navigation = class {

        static navigate = createAction('[Navigation] Navigate', props<{ url: string, skipLocationChange?: boolean }>());

    }

    static Notification = class {

        static showNotification = createAction('[Notification] Show Notification', props<ToastConfiguration>());

    }

    static UI = class {

        static switchTheme = createAction('[UI] Switch Theme');
        static setBigScreen = createAction('[UI] Set Big Screen', props<{ isBigScreen: boolean }>());
        static setSidebarVisible = createAction('[UI] Set Sidebar Visibility', props<{ visible: boolean }>());

    }

}