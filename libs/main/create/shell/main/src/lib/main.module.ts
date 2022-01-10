import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiRadioListModule, TuiInputModule, TuiAccordionModule } from '@taiga-ui/kit';
import { PIMainCreateShellMainComponent } from './containers';
import { PIMainCreateShellMainRoutes } from './main.routing';
import { ReactiveFormsModule } from '@angular/forms';

const MODULES = [
  CommonModule,
  PIMainCreateShellMainRoutes,
  ReactiveComponentModule,
  ReactiveFormsModule,
  TranslateModule,
  TuiButtonModule,
  TuiInputModule,
  TuiAccordionModule,
  TuiRadioListModule
];
const CONTAINERS = [PIMainCreateShellMainComponent];

@NgModule({
  imports: [...MODULES],
  declarations: [...CONTAINERS]
})
export class PIMainCreateShellMainModule {
}
