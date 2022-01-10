import { QuestionTypeEnum } from './question.enum';
import { IAnswer, IAnswerCM } from '../answer';

export interface IQuestion {
  id: string;
  text: string;
  type: QuestionTypeEnum;
  isResolve: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestionCM {
  text: string;
  type: QuestionTypeEnum;
  answers: IAnswerCM[];
}

export interface IQuestionVM extends IQuestion {
  answers: IAnswer[];
}

export interface ITwoQuestionList {
  answered: IQuestionVM[];
  unanswered: IQuestionVM[];
}

