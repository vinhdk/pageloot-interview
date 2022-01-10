import { Injectable } from '@angular/core';
import { PIMainEditStore } from '@main-edit-shared-data-access-store';
import { IQuestionCM } from '@shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PIMainEditService {

  public readonly state$ = this.store.state$;

  constructor(
    protected readonly store: PIMainEditStore,
    protected readonly router: Router
  ) { }

  public init(): void {
    this.store.init();
  }

  public goToManagementPage(): void {
    this.router.navigate(['management']);
  }

  public update(data: IQuestionCM): void {
    this.store.update({
      data,
      cb: () => {
        this.router.navigate(['management']);
      }
    })
  }
}
