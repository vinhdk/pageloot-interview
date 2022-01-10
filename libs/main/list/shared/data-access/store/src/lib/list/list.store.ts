import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PIMainListState } from './list.state';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IQuestionVM, ITwoQuestionList, PIQuestionApi } from '@shared';


@Injectable()
export class PIMainListStore extends ComponentStore<PIMainListState> {
  constructor(
    protected readonly questionApi: PIQuestionApi
  ) {
    super({
      twoList: {
        answered: [],
        unanswered: []
      }
    });
  }

  public readonly init = this.effect(
    (req$: Observable<undefined>) => req$.pipe(
      switchMap(() => this.questionApi.getTwoQuestionList()),
      tap((data) => {
        this.updateTwoList(data);
      })
    )
  );

  public readonly rollBack = this.effect(
    (req$: Observable<string>) => req$.pipe(
      switchMap((req) => this.questionApi.rollBack(req)),
      tap(() => this.init())
    )
  )

  public readonly answerText = this.effect(
    (req$: Observable<{data: IQuestionVM, text: string}>) => req$.pipe(
      switchMap((req) => this.questionApi.answerText(req.data, req.text)),
      tap(() => this.init())
    )
  )

  public readonly answerSingle = this.effect(
    (req$: Observable<{data: IQuestionVM, id: string}>) => req$.pipe(
      switchMap((req) => this.questionApi.answerSingle(req.data, req.id)),
      tap(() => this.init())
    )
  )

  public readonly answerMultiple = this.effect(
    (req$: Observable<{data: IQuestionVM, ids: string[]}>) => req$.pipe(
      switchMap((req) => this.questionApi.answerMultiple(req.data, req.ids)),
      tap(() => this.init())
    )
  )

  public readonly updateTwoList = this.updater((state, twoList: ITwoQuestionList) => ({...state, twoList}))
}
