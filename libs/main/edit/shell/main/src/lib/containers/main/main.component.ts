import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PIMainEditService, PIMainEditStore } from '@main-edit-shared';
import { autoDestroy, followDestroy, IQuestionVM, QuestionTypeEnum } from '@shared';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'pi-main-edit',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PIMainEditStore,
    PIMainEditService
  ]
})
@autoDestroy()
export class PIMainEditShellMainComponent implements OnInit {

  public readonly state$ = this.service.state$
    .pipe(
      tap(({question}) => {
        if (question) {
          this.updateForm(question);
        }
      }),
      followDestroy(this)
    );

  public readonly form = new FormGroup({
    text: new FormControl('', [Validators.required]),
    type: new FormControl(QuestionTypeEnum.Text),
    answers: new FormArray([])
  });

  public get text(): FormControl {
    return this.form.get('text') as FormControl;
  }

  public get type(): FormControl {
    return this.form.get('type') as FormControl;
  }

  public get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  public get valid(): boolean {
    if (this.form.invalid) {
      return false;
    }

    const type = this.type.value;

    if (type === QuestionTypeEnum.Text) {
      return true;
    }

    const answers = this.answers.getRawValue();
    return answers.length >= 2;
  }

  public get canAddAnswer(): boolean {
    const type = this.type.value;
    return type !== QuestionTypeEnum.Text;
  }


  public readonly types: string[] = [
    QuestionTypeEnum.Text,
    QuestionTypeEnum.SingleChoice,
    QuestionTypeEnum.MultipleChoice
  ];

  constructor(
    protected readonly service: PIMainEditService
  ) {
  }

  public ngOnInit(): void {
    this.service.init();
  }

  public updateForm(question: IQuestionVM): void {
    this.text.setValue(question.text);
    this.type.setValue(question.type);
    question.answers.forEach((e) => {
      this.addNewAnswerWithData(e.text);
    });
  }

  public goToManagementPage(): void {
    this.service.goToManagementPage();
  }

  public getAnswerTextControl(group: AbstractControl): FormControl {
    return (group as FormGroup).get('text') as FormControl;
  }

  public addNewAnswerWithData(text: string): void {
    this.answers.push(new FormGroup({
      text: new FormControl(text, [Validators.required])
    }));
  }

  public addNewAnswer(): void {
    this.answers.push(new FormGroup({
      text: new FormControl('', [Validators.required])
    }));
  }

  public remove(index: number): void {
    this.answers.removeAt(index);
  }

  public submit(): void {
    if (!this.valid) {
      return;
    }

    const { text, type, answers } = this.form.value;

    this.service.update({
      text,
      type,
      answers: type === QuestionTypeEnum.Text ? [] : answers
    });
  }
}
