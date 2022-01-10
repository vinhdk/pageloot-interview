import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PIMainState } from './main.state';


@Injectable()
export class PIMainStore extends ComponentStore<PIMainState> {
  constructor() {
    super({});
  }
}
