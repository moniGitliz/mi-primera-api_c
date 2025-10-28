//*Esta es la Interfaz o el Contrato. Define qué acciones debe poder hacer la aplicación (obtener platos, crear uno, etc.), pero no dice cómo las hace.


import { IPlato } from "../../dominio/IPlato";
import { PlatoDTO } from "../../../../presentacion/esquemas/platoEsquema";

export interface IPlatosCasosUso {
  obtenerPlatos(limite?: number): Promise<IPlato[]>;
  obtenerPlatoPorId(idPlato: string): Promise<IPlato | null>;
  crearPlato(plato: PlatoDTO): Promise<string>;
  actualizarPlato(idPlato: string, datosNuevos: any): Promise<IPlato | null>;
  eliminarPlato(idPlato: string): Promise<IPlato | null> ;
}
