import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.scss'
})
export class NuevoProductoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private dialog: MatDialogRef<NuevoProductoComponent>) {

  }

  ngOnInit(): void {
      this.formulario = new FormGroup({
        nombre: new FormControl('', Validators.required),
        unidades: new FormControl('', [Validators.required, Validators.max(10)])
      });
  }

  cancelar() {
    this.dialog.close();
  }

  submit() {
    this.dialog.close(this.formulario.value);
  }

}
