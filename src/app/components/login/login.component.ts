import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formulario: FormGroup;

  constructor(private auth: AuthenticationService, private snackBar: MatSnackBar, private router: Router) {
    this.formulario = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  doLogin() {
    const username = this.formulario.get('username')?.value;
    const password = this.formulario.get('password')?.value;

    this.auth.login(username, password).subscribe({
      next: (respuesta: any) => {
        this.auth.isLogged = true;

        this.snackBar.open('Te has identificado correctamente. Bienvenido', 'Gracias', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });

        // TODO: Redireccionar a las listas de la compra
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        let mensaje = '';
        switch(error.status) {
          case 400:
            mensaje = 'Nombre de usuario o contraseña inválidos'
            break;

          default:
            mensaje = 'Se ha producido un error';
            break;
        }

        this.snackBar.open(mensaje, 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

}
