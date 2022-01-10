import { Route, RouterModule } from '@angular/router';
import { PIMainCreateShellMainComponent } from './containers';

const routes: Route[] = [
  {
    path: '',
    component: PIMainCreateShellMainComponent,
  }
];

export const PIMainCreateShellMainRoutes = RouterModule.forChild(routes);
