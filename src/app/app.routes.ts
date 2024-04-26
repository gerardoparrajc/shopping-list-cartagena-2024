import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: ProductosComponent, canActivate: [authGuard] },
  { path: 'listas-compra', redirectTo: '/', pathMatch: 'full' },
  { path: 'listas-compra/:id', component: ProductosComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: '**', component: PageNotFoundComponent },
];

