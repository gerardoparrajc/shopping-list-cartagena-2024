import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repitePassword: ['', [Validators.required]],
      },
      {
        validator: this.passwordsIguales('password', 'repitePassword'),
      }
    );
  }

  passwordsIguales(passA: string, passB: string) {
    return (formGroup: FormGroup) => {
      const controlPassA = formGroup.get(passA);
      const controlPassB = formGroup.get(passB);

      if (
        controlPassA &&
        controlPassB &&
        controlPassA.value !== controlPassB.value
      ) {
        controlPassB.setErrors({ passwordsIguales: true });
      } else {
        controlPassB?.setErrors(null);
      }
    };
  }

  doRegistro() {
    const username = this.formulario.get('username')?.value;
    const password = this.formulario.get('password')?.value;

    this.authService.register(username, password).subscribe({
      next: (respuesta) => {
        this.snackBar.open(
          'El registro se ha realizado correctamente. Por favor, identifícate',
          'Vamos',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          }
        );

        this.router.navigate(['/login']);
      },
      error: (error) => console.log(error),
    });
  }
}
