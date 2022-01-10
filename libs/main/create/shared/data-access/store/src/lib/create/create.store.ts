import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IQuestionCM, PIQuestionApi } from '@shared';
import { Observable } from 'rxjs';
import { PIMainCreateState } from './create.state';
import { switchMap, tap } from 'rxjs/operators';


@Injectable()
export class PIMainCreateStore extends ComponentStore<PIMainCreateState> {
  constructor(
    protected readonly questionApi: PIQuestionApi
  ) {
    super({});
  }

  public readonly insert = this.effect(
    (req$: Observable<{data: IQuestionCM, cb: Function}>) => req$.pipe(
      switchMap(
        (req) => this.questionApi.insert(req.data).pipe(
          tap(() => req.cb())
        )
      )
    )
  )
}
