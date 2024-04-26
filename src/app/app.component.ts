import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ListaCompra } from './models/lista-compra';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { ListasCompraComponent } from './components/listas-compra/listas-compra.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoginComponent,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    ListasCompraComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  mostrarFormularios: boolean = true;
  listasCompra: ListaCompra[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.router.events.forEach((e: any) => {
      if (e instanceof NavigationEnd) {
        if (
          this.route.root.firstChild?.snapshot.routeConfig?.path === 'login' ||
          this.route.root.firstChild?.snapshot.routeConfig?.path ===
            'register' ||
          this.route.root.firstChild?.snapshot.routeConfig?.path === '**'
        ) {
          this.mostrarFormularios = true;
        } else {
          this.mostrarFormularios = false;
        }
      }
    });
  }

  doLogout() {
    this.auth.logout();
    this.snackBar.open(
      'Se ha cerrado la sesión. Vuelve pronto',
      'Ok',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000
      }
    );
    this.mostrarFormularios = true;
    this.router.navigate(['/login']);
  }
}
