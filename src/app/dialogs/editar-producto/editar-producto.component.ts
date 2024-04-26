import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Producto } from '../../models/producto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss',
})
export class EditarProductoComponent {
  formulario!: FormGroup;

  constructor(
    private dialog: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto
  ) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(this.datosProducto.nombre, Validators.required),
      unidades: new FormControl(this.datosProducto.unidades, [
        Validators.required,
        Validators.max(10),
      ]),
    });
  }

  cancelar() {
    this.dialog.close();
  }

  doSubmit() {
    this.datosProducto.nombre = this.formulario.get('nombre')?.value;
    this.datosProducto.unidades = this.formulario.get('unidades')?.value;
    this.dialog.close(this.datosProducto);
  }
}
