import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiInputModule, TuiRadioListModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { PIMainListShellMainComponent } from './containers';
import {
  PIMainListShellMultipleChoiceComponent,
  PIMainListShellSingleChoiceComponent,
  PIMainListShellTextComponent
} from './components';
import { PIMainListShellMainRoutes } from './main.routing';

const MODULES = [
  CommonModule,
  PIMainListShellMainRoutes,
  ReactiveComponentModule,
  ReactiveFormsModule,
  TranslateModule,
  TuiButtonModule,
  TuiRadioListModule,
  TuiSvgModule,
  TuiTextAreaModule,
  TuiInputModule
];
const CONTAINERS = [PIMainListShellMainComponent];
const COMPONENTS = [
  PIMainListShellMultipleChoiceComponent,
  PIMainListShellSingleChoiceComponent,
  PIMainListShellTextComponent
];

@NgModule({
  imports: [...MODULES],
  declarations: [...CONTAINERS, ...COMPONENTS]
})
export class PIMainListShellMainModule {
}
