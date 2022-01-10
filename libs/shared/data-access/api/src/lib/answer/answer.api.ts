import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IAnswer, IAnswerCM } from './answer.interface';
import { uuid } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class PIAnswerApi {

  public getAllByQuestionId(questionId: string): IAnswer[] {
    return this.answers.filter((a) => a.questionId === questionId);
  }

  public insert(data: IAnswerCM): IAnswer {
    const answer: IAnswer = {
      id: uuid(),
      ...data,
      isSelect: false,
      input: '',
      resolvedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const answers = this.answers;
    answers.push(answer);
    this.answers = answers;

    return answer;
  }

  public insertList(list: IAnswerCM[]): IAnswer[] {
    const listAnswers = list.map((answer) => ({
      id: uuid(),
      ...answer,
      isSelect: false,
      input: '',
      resolvedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    const answers = this.answers;
    answers.push(...listAnswers);
    this.answers = answers;

    return listAnswers;
  }

  public remove(id: string): IAnswer[] {
    const answers = this.answers.filter((e) => e.id !== id);
    this.answers = answers;
    return answers;
  }

  public removeList(ids: string[]): IAnswer[] {
    const answers = this.answers.filter((e) => !ids.includes(e.id));
    this.answers = answers;
    return answers;
  }

  public removeByQuestionId(questionId: string): IAnswer[] {
    const answers = this.answers.filter((e) => e.questionId !== questionId);
    this.answers = answers;
    return answers;
  }

  public update(id: string, data: Partial<IAnswerCM>): IAnswer {
    const answers = this.answers;
    const pos = answers.findIndex((q) => q.id === id);
    const answer: IAnswer = {
      ...answers[pos],
      ...data,
      updatedAt: new Date()
    };
    answers[pos] = answer;
    this.answers = answers;
    return answer;
  }

  public get answers(): IAnswer[] {
    const answers = JSON.parse(localStorage.getItem('answers') || '[]') as IAnswer[];
    return answers.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
  }

  public set answers(answers: IAnswer[]) {
    localStorage.setItem('answers', JSON.stringify(answers));
  }
}
