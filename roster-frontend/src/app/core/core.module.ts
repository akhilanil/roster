import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';

/* Angular Material imports */
import { MatToolbarModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatToolbarModule,

  ],
  exports: [
    MatToolbarModule,
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [  ]
    };
  }

}
