import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PIMainManagementState } from './management.state';
import { PIQuestionApi, IQuestionVM } from '@shared';


@Injectable()
export class PIMainManagementStore extends ComponentStore<PIMainManagementState> {
  constructor(
    protected readonly questionApi: PIQuestionApi
  ) {
    super({
      questions: []
    });
  }

  public readonly init = this.effect(
    (req$: Observable<undefined>) => req$.pipe(
      switchMap(() => this.questionApi.getAll()),
      tap((data) => {
        this.updateQuestions(data);
      })
    )
  );

  public readonly remove = this.effect(
    (req$: Observable<string>) => req$.pipe(
      switchMap((req) => this.questionApi.remove(req)),
      tap((data) => {
        this.updateQuestions(data);
      })
    )
  )

  public readonly updateQuestions = this.updater((state, questions: IQuestionVM[]) => ({...state, questions}))
}
