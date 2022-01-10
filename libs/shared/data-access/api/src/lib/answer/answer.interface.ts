export interface IAnswer {
  id: string;
  text: string;
  isSelect: boolean;
  input: string;
  questionId: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date;
}

export interface IAnswerCM {
  text: string;
  questionId: string;
  isSelect?: boolean;
  input?: string;
}
