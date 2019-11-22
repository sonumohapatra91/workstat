import {NgModule} from "@angular/core";

import { CommonModule } from '@angular/common';	

import {

  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule, MatListModule,

  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatSidenavModule, 

} from '@angular/material';

@NgModule({

  imports: [

  CommonModule, 

  MatToolbarModule,

  MatButtonModule, 

  MatCardModule,

  MatInputModule,

  MatDialogModule,

  MatTableModule,

  MatMenuModule,

  MatIconModule,
  
  MatSidenavModule,

  MatListModule,

  MatProgressSpinnerModule

  ],

  exports: [

  CommonModule,

   MatToolbarModule, 

   MatButtonModule, 

   MatCardModule, 

   MatInputModule, 

   MatDialogModule, 

   MatTableModule, 

   MatMenuModule,

   MatIconModule,

   MatListModule,

   MatProgressSpinnerModule,

   MatSidenavModule

   ],

})

export class CustomMaterialModule { }