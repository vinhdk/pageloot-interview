import { Injectable } from '@angular/core';
import { PIMainManagementStore } from '@main-management-shared-data-access-store';
import { Router } from '@angular/router';

@Injectable()
export class PIMainManagementService {

  public readonly state$ = this.store.state$;

  constructor(
    protected readonly store: PIMainManagementStore,
    protected readonly router: Router
  ) { }

  public init(): void {
    this.store.init();
  }

  public remove(id: string): void {
    this.store.remove(id);
  }

  public goToCreationPage(): void {
    this.router.navigate(['create']);
  }

  public goToListPage(): void {
    this.router.navigate(['list']);
  }

  public goToEditPage(id: string): void {
    this.router.navigate(['edit/' + id]);
  }
}
