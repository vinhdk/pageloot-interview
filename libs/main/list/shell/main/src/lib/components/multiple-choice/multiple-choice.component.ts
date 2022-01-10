import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { IQuestionVM } from '@shared';
import { PIMainListService } from '@main-list';

@Component({
  selector: 'pi-main-list-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PIMainListShellMultipleChoiceComponent {

  @Input()
  public question!: IQuestionVM;

  @Input()
  public answered: boolean = false;


  public get valid(): boolean {
    const ids = this.answers.filter((e) => !!e.checked);
    return ids.length > 0;
  }

  public get answers(): { value: string, label: string, checked: boolean }[] {
    return this.question.answers.map((e) => ({
      label: e.text,
      value: e.id,
      checked: e.isSelect
    }));
  }

  constructor(
    protected readonly service: PIMainListService,
  ) {
  }

  public submit(): void {
    if (!this.valid) {
      return;
    }

    this.service.answerMultiple(this.question, this.question.answers.filter((e) => e.isSelect).map((e) => e.id));
  }

  public check(id: string): boolean {
    return this.answers.filter((e) => e.value === id).length > 0;
  }

  public change(answer: { value: string, label: string, checked: boolean }): void {
    if (this.answered) {
      return;
    }
    const pos = this.question.answers.findIndex((e) => e.id === answer.value);
    this.question.answers[pos].isSelect = !answer.checked;
  }

  public rollBack(): void {
    this.service.rollBack(this.question.id);
  }
}
