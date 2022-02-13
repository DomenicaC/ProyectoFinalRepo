import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-sesion',
    //redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'registrarse',
    loadChildren: () =>
      import('./pages/registrarse/registrarse.module').then(
        (m) => m.RegistrarsePageModule
      ),
  },
  {
    path: 'inicio-sesion',
    loadChildren: () =>
      import('./pages/inicio-sesion/inicio-sesion.module').then(
        (m) => m.InicioSesionPageModule
      ),
  },
  {
    path: 'principal',
    loadChildren: () =>
      import('./pages/principal/principal.module').then(
        (m) => m.PrincipalPageModule
      ),
  },
  {
    path: 'lugares',
    loadChildren: () =>
      import('./pages/lugares/lugares.module').then((m) => m.LugaresPageModule),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./pages/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule
      ),
  },
  {
    path: 'lugar',
    loadChildren: () =>
      import('./pages/lugar/lugar.module').then((m) => m.LugarPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
