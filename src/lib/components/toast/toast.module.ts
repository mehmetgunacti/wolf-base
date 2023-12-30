import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastWrapperComponent } from './toast-wrapper.component';
import { ToastComponent } from './toast.component';

@NgModule({
	declarations: [
		ToastComponent,
		ToastWrapperComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		ToastWrapperComponent,
		ToastComponent
	]
})
export class ToastModule { }
