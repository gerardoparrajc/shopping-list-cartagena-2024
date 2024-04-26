import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../../models/producto';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoComponent } from '../../../dialogs/editar-producto/editar-producto.component';
import { ListasCompraService } from '../../../services/listas-compra.service';

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

  constructor(private dialog: MatDialog, private listasCompraService: ListasCompraService) {

  }

  showDialogEditarProducto() {
    const dialog = this.dialog.open(EditarProductoComponent, {
      data: this.producto,
    });

    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.listasCompraService
            .updateProductoFromLista(result as Producto)
            .subscribe({
              next: (respuesta) => console.log(respuesta),
              error: (error) => console.log(error),
            });
        }
      },
      error: (error) => console.log(error),
    });
  }

  showDialogEliminarProducto() {}

  cancelarClick(evento: MouseEvent) {
    evento.stopPropagation();
  }
}
