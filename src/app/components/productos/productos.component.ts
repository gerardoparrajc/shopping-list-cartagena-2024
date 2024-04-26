import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ActivatedRoute, Params } from '@angular/router';
import { ListasCompraService } from '../../services/listas-compra.service';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ItemProductoComponent } from './item-producto/item-producto.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ItemProductoComponent,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  idLista: number = -1;
  sinListaSeleccionada: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private listasCompraService: ListasCompraService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idLista = params['id'];

      if (this.idLista && this.idLista !== -1) {
        this.sinListaSeleccionada = false;
        this.actualizarListaCompra();
      }
    });
  }

  actualizarListaCompra() {
    this.listasCompraService.getProductosFromLista(this.idLista).subscribe({
      next: (respuesta: any) => {
        if (respuesta.success) {
          this.sinListaSeleccionada = false;
          this.productos = respuesta.data;
        } else {
          alert(
            'Se ha producido un error al obtener los productos de la lista de la compra.'
          );
          this.sinListaSeleccionada = true;
          console.log(respuesta);
        }
      },
      error: (error: any) => {
        alert(
          'Se ha producido un error al obtener los productos de la lista de la compra.'
        );
        this.sinListaSeleccionada = true;
        console.log(error);
      },
    });
  }

  doActualziarLista() {
    this.actualizarListaCompra();
  }

  showAnadirProducto() {

  }
}
