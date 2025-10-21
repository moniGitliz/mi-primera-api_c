import { IPlato } from "../../dominio/IPlato";
import { PlatoDTO } from "../../../../presentacion/esquemas/platoEsquema";

export interface IPlatosCasosUso {
  obtenerPlatos(limite?: number): Promise<IPlato[]>;
  obtenerPlatoPorId(idPlato: string): Promise<IPlato | null>;
  crearPlato(plato: PlatoDTO): Promise<string>;
  actualizarPlato(idPlato: string, plato: IPlato): Promise<IPlato | null>;
  eliminarPlato(idPlato: string): Promise<void>;
}
