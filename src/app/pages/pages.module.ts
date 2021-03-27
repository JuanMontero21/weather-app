import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// TODO: Cambiar esto al componente home ??
import { HttpClientModule } from '@angular/common/http';
// Modules
import { RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule
  ]
})
export class PagesModule { }
