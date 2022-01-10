import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiAccordionModule, TuiInputModule, TuiRadioListModule } from '@taiga-ui/kit';
import { PIMainEditShellMainComponent } from './containers';
import { PIMainEditShellMainRoutes } from './main.routing';

const MODULES = [
  CommonModule,
  PIMainEditShellMainRoutes,
  ReactiveComponentModule,
  ReactiveFormsModule,
  TranslateModule,
  TuiButtonModule,
  TuiInputModule,
  TuiAccordionModule,
  TuiRadioListModule
];
const CONTAINERS = [PIMainEditShellMainComponent];

@NgModule({
  imports: [...MODULES],
  declarations: [...CONTAINERS]
})
export class PIMainEditShellMainModule {
}
