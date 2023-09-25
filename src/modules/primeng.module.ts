import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';
import { MessagesModule } from 'primeng/messages';
import { TreeSelectModule } from 'primeng/treeselect';
import { MenuModule } from 'primeng/menu';

export const modules = [
	AccordionModule,
	AvatarModule,
	AutoCompleteModule,
	BreadcrumbModule,
	ButtonModule,
	CalendarModule,
	CardModule,
	CheckboxModule,
	ConfirmDialogModule,
	ConfirmPopupModule,
	DataViewModule,
	DialogModule,
	DividerModule,
	DynamicDialogModule,
	DropdownModule,
	FieldsetModule,
	InputSwitchModule,
	InputTextareaModule,
	InputTextModule,
	InputNumberModule,
	MenuModule,
	MessagesModule,
	OverlayPanelModule,
	PanelModule,
	PanelMenuModule,
	RadioButtonModule,
	SelectButtonModule,
	SidebarModule,
	TableModule,
	TabViewModule,
	TagModule,
	ToastModule,
	TooltipModule,
	ToggleButtonModule,
	TreeSelectModule
];

@NgModule({
	declarations: [],
	imports: [
		...modules
	],
	exports: [
		...modules
	]
})
export class PrimeNgModule { }
