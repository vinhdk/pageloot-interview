import { Route, RouterModule } from '@angular/router';
import { PIMainShellMainComponent } from './containers';

const routes: Route[] = [
  {
    path: '',
    component: PIMainShellMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'management',
        pathMatch: 'full'
      },
      {
        path: 'management',
        loadChildren: () => import('@main-management').then((m) => m.PIMainManagementShellMainModule)
      },
      {
        path: 'list',
        loadChildren: () => import('@main-list').then((m) => m.PIMainListShellMainModule)
      },
      {
        path: 'create',
        loadChildren: () => import('@main-create').then((m) => m.PIMainCreateShellMainModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('@main-edit').then((m) => m.PIMainEditShellMainModule)
      }
    ]
  }
];

export const PIMainShellMainRoutes = RouterModule.forRoot(routes, { enableTracing: true });
