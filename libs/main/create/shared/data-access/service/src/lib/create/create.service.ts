import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PIMainCreateStore } from '@main-create-shared-data-access-store';
import { IQuestionCM } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class PIMainCreateService {

  public readonly state$ = this.store.state$;

  constructor(
    protected readonly store: PIMainCreateStore,
    protected readonly router: Router
  ) { }

  public goToManagementPage(): void {
    this.router.navigate(['management']);
  }

  public insert(data: IQuestionCM): void {
    this.store.insert({
      data,
      cb: () => {
        this.router.navigate(['management']);
      }
    })
  }
}
