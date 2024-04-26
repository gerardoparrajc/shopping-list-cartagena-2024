import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../../models/producto';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-item-producto',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './item-producto.component.html',
  styleUrl: './item-producto.component.scss',
})
export class ItemProductoComponent {
  @Input() producto!: Producto;
  @Output() actualizarLista: EventEmitter<void> = new EventEmitter<void>();
}
