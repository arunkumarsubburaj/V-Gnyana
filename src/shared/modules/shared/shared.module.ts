import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AgGridModule } from 'ag-grid-angular';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LightboxModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMultiSelectModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    LightboxModule,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule,
    AngularMultiSelectModule,
    AgGridModule,
  ],
})
export class SharedModule {}
