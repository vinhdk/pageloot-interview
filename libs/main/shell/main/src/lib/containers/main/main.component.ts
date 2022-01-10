import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PIMainService, PIMainStore } from '@main-shared';
import { autoDestroy, followDestroy } from '@shared';

@Component({
  selector: 'pi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PIMainStore,
    PIMainService
  ]
})
@autoDestroy()
export class PIMainShellMainComponent {

  public readonly state$ = this.service.state$
    .pipe(
      followDestroy(this)
    );

  constructor(
    protected readonly service: PIMainService
  ) {
  }
}
