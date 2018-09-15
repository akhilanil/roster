import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatStepperModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatBottomSheetModule,
  MatListModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatStepperModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatListModule,

  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatStepperModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatListModule,
  ]
})
export class MaterialModule {}
