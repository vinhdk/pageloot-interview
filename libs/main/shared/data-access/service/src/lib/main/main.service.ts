import { Injectable } from '@angular/core';
import { PIMainStore } from '@main-shared-data-access-store';

@Injectable({
  providedIn: 'root'
})
export class PIMainService {

  public readonly state$ = this.store.state$;

  constructor(
    protected readonly store: PIMainStore
  ) { }
}
