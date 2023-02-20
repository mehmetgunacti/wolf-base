import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'modules/shared/shared.module';
import { BookmarkRoutingModule } from './bookmark-routing.module';
import * as fromConfig from './bookmark.config';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { BookmarkEditContainerComponent } from './containers/bookmark-edit-container/bookmark-edit-container.component';
import * as fromStore from './store';

@NgModule({
	declarations: [...fromConfig.components],
	imports: [
		CommonModule,
		BookmarkRoutingModule,
		ReactiveFormsModule,
		StoreModule.forFeature('bookmarksModule', fromConfig.reducers), //  , { metaReducers }),
		EffectsModule.forFeature([...fromStore.effects]),
		SharedModule
	],
	entryComponents: [
        BookmarkEditContainerComponent
    ]
})
export class BookmarkModule { }
