import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { TuiButtonModule} from '@taiga-ui/core';
import { PIMainManagementShellMainComponent } from './containers';
import { PIMainManagementShellMainRoutes } from './main.routing';

const MODULES = [
  CommonModule,
  PIMainManagementShellMainRoutes,
  ReactiveComponentModule,
  TuiButtonModule,
  TranslateModule
];
const CONTAINERS = [PIMainManagementShellMainComponent];

@NgModule({
  imports: [...MODULES],
  declarations: [...CONTAINERS]
})
export class PIMainManagementShellMainModule {
}
