import { Component, OnInit } from '@angular/core';
import { ListaCompra } from '../../models/lista-compra';
import { ListasCompraService } from '../../services/listas-compra.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ItemListaCompraComponent } from './item-lista-compra/item-lista-compra.component';

@Component({
  selector: 'app-listas-compra',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, ItemListaCompraComponent],
  templateUrl: './listas-compra.component.html',
  styleUrl: './listas-compra.component.scss'
})
export class ListasCompraComponent implements OnInit {

  listasCompra: ListaCompra[] = [];

  constructor(private listasCompraService: ListasCompraService) {}

  ngOnInit(): void {
      this.listasCompraService.getListasCompra().subscribe({
        next: (respuesta: any) => {
          if (respuesta.success) {
            this.listasCompra = respuesta.data;
          } else {
            alert('Se ha producido une rror al obtner las listas de la compra');
          }
        },
        error: (error) => {
          alert('Se ha producido une rror al obtner las listas de la compra');
          console.log(error);
        }
      });
  }

  doListaActualizada(event: any) {}

  showNewListDialog() {}

}
