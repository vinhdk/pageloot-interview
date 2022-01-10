import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PIMainShellUILayoutComponent } from './containers';

const MODULES = [
  CommonModule,
  RouterModule
];
const CONTAINERS = [PIMainShellUILayoutComponent];

@NgModule({
  imports: [...MODULES],
  declarations: [...CONTAINERS],
  exports: [...CONTAINERS]
})
export class PIMainShellUILayoutModule {}
