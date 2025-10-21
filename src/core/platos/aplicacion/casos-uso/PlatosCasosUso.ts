import { IPlatosCasosUso } from "../casos-uso/IPlatosCasosUso";
import { IPlato } from "../../dominio/IPlato";
import { PlatoDTO } from "../../../../presentacion/esquemas/platoEsquema";
import { v4 as uuidv4 } from "uuid";
import { Plato } from "../../dominio/Plato";

const platos: IPlato[] = [];

export class PlatosCasosUso implements IPlatosCasosUso {
  async obtenerPlatos(limite?: number): Promise<IPlato[]> {
    return platos;
  }

  async obtenerPlatoPorId(idPlato: string): Promise<IPlato | null> {
    return null;
  }

  async crearPlato(plato: PlatoDTO): Promise<string> {
    const idPlato = uuidv4();
    const nuevoPlato = new Plato(plato, idPlato);

    await platos.push(nuevoPlato);
    return nuevoPlato.idPlato;
  }

  async actualizarPlato(
    idPlato: string,
    plato: IPlato
  ): Promise<IPlato | null> {
    return null;
  }

  async eliminarPlato(idPlato: string): Promise<void> {
    return;
  }
}
