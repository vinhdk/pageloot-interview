import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIMainShellUILayoutModule } from '@main-shell-ui';
import { ReactiveComponentModule } from '@ngrx/component';
import { PIMainShellMainComponent } from './containers';
import { PIMainShellMainRoutes } from './main.routing';

const MODULES = [
  CommonModule,
  PIMainShellMainRoutes,
  PIMainShellUILayoutModule,
  ReactiveComponentModule
];
const CONTAINERS = [PIMainShellMainComponent];

@NgModule({
  imports: [...MODULES],
  declarations: [...CONTAINERS]
})
export class PIMainShellMainModule {
}
