import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListaCompra } from '../../../models/lista-compra';

import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-item-lista-compra',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './item-lista-compra.component.html',
  styleUrl: './item-lista-compra.component.scss',
})
export class ItemListaCompraComponent {
  @Input() lista!: ListaCompra;
  @Output() listaActualizada: EventEmitter<ListaCompra[]> = new EventEmitter<
    ListaCompra[]
  >();
}
