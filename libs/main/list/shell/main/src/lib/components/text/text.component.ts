import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IQuestionVM } from '@shared';
import { PIMainListService } from '@main-list';

@Component({
  selector: 'pi-main-list-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PIMainListShellTextComponent implements OnInit {

  @Input()
  public question!: IQuestionVM;

  @Input()
  public answered: boolean = false;

  public readonly input = new FormControl('', [Validators.required]);

  constructor(
    protected readonly service: PIMainListService
  ) {
  }


  public ngOnInit(): void {
    const input = this.question.answers[0]?.input;
    this.input.setValue(input);
    if (this.answered) {
      this.input.disable();
    }
  }

  public submit(): void {
    if (this.input.invalid) {
      return;
    }

    this.service.answerText(this.question, this.input.value);
  }

  public rollBack(): void {
    this.service.rollBack(this.question.id);
  }
}
