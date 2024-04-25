import { Producto } from "./producto";

export interface ListaCompra {
  id?: string;
  nombre: string;
  productos: Producto[];
}
