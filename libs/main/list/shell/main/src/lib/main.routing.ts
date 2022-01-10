import { Route, RouterModule } from '@angular/router';
import { PIMainListShellMainComponent } from './containers';

const routes: Route[] = [
  {
    path: '',
    component: PIMainListShellMainComponent,
  }
];

export const PIMainListShellMainRoutes = RouterModule.forChild(routes);
