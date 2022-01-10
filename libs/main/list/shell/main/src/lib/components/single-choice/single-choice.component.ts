import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IAnswer, IQuestionVM } from '@shared';
import { FormControl, Validators } from '@angular/forms';
import { PIMainListService } from '@main-list';

@Component({
  selector: 'pi-main-list-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PIMainListShellSingleChoiceComponent implements OnInit {

  @Input()
  public question!: IQuestionVM;

  @Input()
  public answered: boolean = false;

  public readonly input = new FormControl(undefined, [Validators.required]);

  public answers: string[] = [];

  constructor(
    protected readonly service: PIMainListService
  ) {
  }

  public ngOnInit(): void {
    this.answers = this.question ? this.question.answers.map((e) => e.id) : [];

    const answer = this.question.answers.find((e) => e.isSelect) as IAnswer;

    if (answer) {
      this.input.setValue(answer.id);
    } else {
      this.input.setValue(undefined);
    }

    if (this.answered) {
      this.input.disable();
    }
  }

  public submit(): void {
    if (this.input.invalid) {
      return;
    }

    this.service.answerSingle(this.question, this.input.value);
  }

  public rollBack(): void {
    this.service.rollBack(this.question.id);
  }

  public getText(id: string): string {
    const answer = this.question.answers.find((e) => e.id === id) as IAnswer;
    return answer.text;
  }
}
