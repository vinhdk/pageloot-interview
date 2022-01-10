import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PIMainListService, PIMainListStore } from '@main-list-shared';
import { autoDestroy, followDestroy, QuestionTypeEnum } from '@shared';

@Component({
  selector: 'pi-main-list',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PIMainListStore,
    PIMainListService
  ]
})
@autoDestroy()
export class PIMainListShellMainComponent implements OnInit {

  public readonly state$ = this.service.state$
    .pipe(
      followDestroy(this)
    );

  public readonly QuestionType = QuestionTypeEnum;

  constructor(
    protected readonly service: PIMainListService
  ) {
  }

  public ngOnInit(): void {
    this.service.init();
  }

  public goToCreationPage(): void {
    this.service.goToCreationPage();
  }

  public goToManagementPage(): void {
    this.service.goToManagementPage();
  }
}
