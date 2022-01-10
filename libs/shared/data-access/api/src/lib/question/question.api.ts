import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IQuestion, IQuestionCM, IQuestionVM, ITwoQuestionList } from './question.interface';
import { IAnswer, uuid } from '@shared';
import { PIAnswerApi } from '../answer';

@Injectable({
  providedIn: 'root'
})
export class PIQuestionApi {

  constructor(
    protected readonly answerApi: PIAnswerApi
  ) {
  }


  public getAll(): Observable<IQuestionVM[]> {
    return of(this.questionVMs);
  }

  public rollBack(id: string): Observable<IQuestionVM> {
    const questions = this.questions;
    const pos = questions.findIndex((q) => q.id === id);
    if (pos === -1) {
      return throwError(new Error('Not found'));
    }

    const question: IQuestion = {
      ...questions[pos],
      isResolve: false,
      updatedAt: new Date()
    };

    questions[pos] = question;
    this.questions = questions;

    return this.getById(id);
  }

  public answerText(data: IQuestionVM, input: string): Observable<IQuestionVM> {
    const questions = this.questions;
    const pos = questions.findIndex((q) => q.id === data.id);
    if (pos === -1) {
      return throwError(new Error('Not found'));
    }

    const question: IQuestion = {
      ...questions[pos],
      text: data.text,
      type: data.type,
      isResolve: true,
      updatedAt: new Date()
    };
    questions[pos] = question;
    this.questions = questions;
    const answer = this.answerApi.getAllByQuestionId(data.id)[0];
    if (answer) {
      this.answerApi.update(answer.id, {
        input
      });
    } else {
      this.answerApi.insert({
        input,
        text: '',
        questionId: question.id,
        isSelect: false,
      })
    }
    return this.getById(data.id);
  }

  public answerSingle(data: IQuestionVM, id: string): Observable<IQuestionVM> {
    const questions = this.questions;
    const pos = questions.findIndex((q) => q.id === data.id);
    if (pos === -1) {
      return throwError(new Error('Not found'));
    }

    const question: IQuestion = {
      ...questions[pos],
      text: data.text,
      type: data.type,
      isResolve: true,
      updatedAt: new Date()
    };
    questions[pos] = question;
    this.questions = questions;
    const answers = this.answerApi.getAllByQuestionId(data.id);
    answers.forEach((e) => {
      this.answerApi.update(e.id, {
        isSelect: e.id === id
      })
    });
    return this.getById(data.id);
  }

  public answerMultiple(data: IQuestionVM, ids: string[]): Observable<IQuestionVM> {
    const questions = this.questions;
    const pos = questions.findIndex((q) => q.id === data.id);
    if (pos === -1) {
      return throwError(new Error('Not found'));
    }

    const question: IQuestion = {
      ...questions[pos],
      text: data.text,
      type: data.type,
      isResolve: true,
      updatedAt: new Date()
    };
    questions[pos] = question;
    this.questions = questions;
    const answers = this.answerApi.getAllByQuestionId(data.id);
    answers.forEach((e) => {
      this.answerApi.update(e.id, {
        isSelect: ids.includes(e.id)
      })
    });
    return this.getById(data.id);
  }

  public getTwoQuestionList(): Observable<ITwoQuestionList> {
    const twoList = this.questionVMs.sort((a, b) => {
      const timeA = new Date(a.updatedAt);
      const timeB = new Date(b.updatedAt);
      return timeA > timeB ? -1 : 1;
    }).reduce((acc, cur) => {
      if (cur.isResolve) {
        acc.answered.push(cur);
      } else {
        acc.unanswered.push(cur);
      }
      return acc;
    }, { answered: [], unanswered: [] } as ITwoQuestionList);
    return of(twoList);
  }

  public getById(id: string): Observable<IQuestionVM> {
    const questions = this.questionVMs;
    const pos = questions.findIndex((q) => q.id === id);
    if (pos === -1) {
      return throwError(new Error('Not found'));
    }
    return of(questions[pos]);
  }

  public insert(data: IQuestionCM): Observable<IQuestionVM> {
    const question: IQuestion = {
      id: uuid(),
      text: data.text,
      type: data.type,
      isResolve: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const questions = this.questions;
    questions.push(question);
    this.questions = questions;
    this.answerApi.insertList(data.answers.map((e) => ({
      ...e,
      questionId: question.id
    })));
    return this.getById(question.id);
  }

  public update(id: string, data: IQuestionCM): Observable<IQuestionVM> {
    const questions = this.questions;
    const pos = questions.findIndex((q) => q.id === id);
    if (pos === -1) {
      return throwError(new Error('Not found'));
    }

    const question: IQuestion = {
      ...questions[pos],
      text: data.text,
      type: data.type,
      isResolve: false,
      updatedAt: new Date()
    };
    questions[pos] = question;
    this.questions = questions;
    this.answerApi.removeByQuestionId(question.id);
    this.answerApi.insertList(data.answers.map((e) => ({
      ...e,
      questionId: question.id
    })));
    return this.getById(id);
  }

  public remove(id: string): Observable<IQuestionVM[]> {
    const questions = this.questions;
    const pos = questions.findIndex((q) => q.id === id);
    if (pos === -1) {
      return throwError(new Error('Not found'));
    }

    this.answerApi.removeByQuestionId(id);
    questions.splice(pos, 1);
    this.questions = questions;
    return of(this.questionVMs);
  }

  public get questionVMs(): IQuestionVM[] {
    return this.questions.map((e) => ({
      ...e,
      answers: this.answerApi.getAllByQuestionId(e.id)
    }));
  }

  public get questions(): IQuestion[] {
    const questions = JSON.parse(localStorage.getItem('questions') || '[]') as IQuestion[];
    return questions.sort((a, b) => {
      const timeA = new Date(a.createdAt);
      const timeB = new Date(b.createdAt);
      return timeA > timeB ? -1 : 1;
    });
  }

  public set questions(questions: IQuestion[]) {
    localStorage.setItem('questions', JSON.stringify(questions));
  }
}
