import { Injectable } from '@angular/core';
import { PIMainListStore } from '@main-list-shared-data-access-store';
import { Router } from '@angular/router';
import { IQuestionVM } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class PIMainListService {

  public readonly state$ = this.store.state$;

  constructor(
    protected readonly store: PIMainListStore,
    protected readonly router: Router
  ) { }

  public init(): void {
    this.store.init();
  }

  public goToCreationPage(): void {
    this.router.navigate(['create']);
  }

  public goToManagementPage(): void {
    this.router.navigate(['management']);
  }

  public rollBack(id: string): void {
    this.store.rollBack(id);
  }

  public answerText(data: IQuestionVM, text: string): void {
    this.store.answerText({ data, text });
  }

  public answerSingle(data: IQuestionVM, id: string): void {
    this.store.answerSingle({ data, id });
  }

  public answerMultiple(data: IQuestionVM, ids: string[]): void {
    this.store.answerMultiple({ data, ids });
  }
}
