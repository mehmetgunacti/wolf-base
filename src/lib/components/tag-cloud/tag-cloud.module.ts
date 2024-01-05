import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagCloudComponent } from '../tag-cloud/tag-cloud.component';

@NgModule({

	declarations: [TagCloudComponent],
	imports: [CommonModule],
	exports: [TagCloudComponent]

})
export class TagCloudModule { }
