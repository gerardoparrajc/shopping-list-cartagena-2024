import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaCompra } from '../models/lista-compra';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ListasCompraService {

  private urlServer = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getListasCompra() {
    return this.http.get(`${this.urlServer}/listas-compra`);
  }

  getListaCompra(id: number) {
    return this.http.get(`${this.urlServer}/listas-compra/${id}`);
  }

  createListaCompra(lista: ListaCompra) {
    return this.http.post(`${this.urlServer}/lista-compra`, lista);
  }

  updateListaCompra(lista: ListaCompra) {
    return this.http.put(`${this.urlServer}/listas-compra/${lista.id}`, lista);
  }

  deleteListaCompra(idLista: number) {
    return this.http.delete(`${this.urlServer}listas-compra/${idLista}`);
  }

  getProductosFromLista(idLista: number) {
    return this.http.get(`${this.urlServer}/listas-compra/${idLista}/productos`);
  }

  addProductoToLista(idLista: number, producto: Producto) {
    return this.http.post(`${this.urlServer}/listas-compra/${idLista}/productos`, producto);
  }

  updateProductoFromLista(producto: Producto) {
    return this.http.put(`${this.urlServer}/productos/${producto.id}`, producto);
  }

  deleteProducto(idProducto: number) {
    return this.http.delete(`${this.urlServer}/productos/${idProducto}`);
  }
}
