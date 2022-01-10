import { Route, RouterModule } from '@angular/router';
import { PIMainManagementShellMainComponent } from './containers';

const routes: Route[] = [
  {
    path: '',
    component: PIMainManagementShellMainComponent,
  }
];

export const PIMainManagementShellMainRoutes = RouterModule.forChild(routes);
