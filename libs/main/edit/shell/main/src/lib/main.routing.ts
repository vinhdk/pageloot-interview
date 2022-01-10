import { Route, RouterModule } from '@angular/router';
import { PIMainEditShellMainComponent } from './containers';

const routes: Route[] = [
  {
    path: '',
    component: PIMainEditShellMainComponent,
  }
];

export const PIMainEditShellMainRoutes = RouterModule.forChild(routes);
