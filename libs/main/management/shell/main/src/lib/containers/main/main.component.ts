import { ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { autoDestroy, followDestroy } from '@shared';
import { PIMainManagementService, PIMainManagementStore } from '@main-management-shared';

@Component({
  selector: 'pi-main-management',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PIMainManagementStore,
    PIMainManagementService
  ]
})
@autoDestroy()
export class PIMainManagementShellMainComponent implements OnInit {

  public readonly state$ = this.service.state$
    .pipe(
      followDestroy(this)
    );

  constructor(
    protected readonly service: PIMainManagementService
  ) { }

  public ngOnInit(): void {
    this.service.init();
  }

  public remove(id: string): void {
    this.service.remove(id);
  }

  public goToCreationPage(): void {
    this.service.goToCreationPage();
  }

  public goToListPage(): void {
    this.service.goToListPage();
  }

  public goToEditPage(id: string): void {
    this.service.goToEditPage(id);
  }
}
