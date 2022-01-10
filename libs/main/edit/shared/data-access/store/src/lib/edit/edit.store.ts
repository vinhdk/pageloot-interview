import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PIMainEditState } from './edit.state';
import { IQuestionCM, IQuestionVM, PIQuestionApi } from '@shared';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class PIMainEditStore extends ComponentStore<PIMainEditState> {
  constructor(
    protected readonly questionApi: PIQuestionApi,
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly router: Router
  ) {
    super({
      question: undefined
    });
  }

  public readonly init = this.effect(
    (req$: Observable<undefined>) => req$.pipe(
      switchMap(() =>
        this.activatedRoute.params.pipe(
          switchMap((params) =>
            this.questionApi.getById(params.id).pipe(
              tap((data) => {
                this.updateQuestion(data);
              }),
              catchError((err) => {
                this.updateQuestion(undefined);
                this.router.navigate(['management']);
                return EMPTY;
              })
            )
          )
        )
      )
    )
  )

  public readonly update = this.effect(
    (req$: Observable<{data: IQuestionCM, cb: Function}>) => req$.pipe(
      switchMap((req) =>
        this.select((state) => state.question).pipe(
          take(1),
          switchMap(
            (question) => this.questionApi.update((question as IQuestionVM).id, req.data).pipe(
              tap(() => req.cb())
            )
          )
        )
      )
    )
  )

  public updateQuestion = this.updater((state, question: IQuestionVM | undefined) => ({...state, question}));
}
