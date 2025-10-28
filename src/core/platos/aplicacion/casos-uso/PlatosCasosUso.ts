//* Esta es la Implementación. Es la clase que realmente hace el trabajo y cumple con ese contrato.
//* Este archivo NUNCA debe importar nada de src/presentacion. No sabe qué es Fastify. Solo sabe manipular arrays (o en el futuro, un repositorio de base de datos).

import { IPlatosCasosUso } from "../casos-uso/IPlatosCasosUso";
import { IPlato } from "../../dominio/IPlato";
import { PlatoDTO } from "../../../../presentacion/esquemas/platoEsquema";
import { v4 as uuidv4 } from "uuid";
import { Plato } from "../../dominio/Plato";

const platos: IPlato[] = [];

export class PlatosCasosUso implements IPlatosCasosUso {
  async obtenerPlatos(limite?: number): Promise<IPlato[]> {
    if (limite && limite > 0) {
      return platos.slice(0, limite);
    }
    return platos;
  }

  async obtenerPlatoPorId(idPlato: string): Promise<IPlato | null> {
    const platoBuscado = platos.find((plato) => plato.idPlato === idPlato);
    if (!platoBuscado) {
      return null;
    }
    return platoBuscado;
  }

  async crearPlato(plato: PlatoDTO): Promise<string> {
    const idPlato = uuidv4();
    const nuevoPlato = new Plato(plato, idPlato);

    platos.push(nuevoPlato);
    return nuevoPlato.idPlato;
  }

  async actualizarPlato(
    idPlato: string,
    datosNuevos: PlatoDTO
  ): Promise<IPlato | null> {
    const indicePlato = platos.findIndex((plato) => plato.idPlato === idPlato);

    if (indicePlato === -1) {
      return null;
    }

    const platoExistente = platos[indicePlato]!;

    const platoActualizado: IPlato = {
      ...platoExistente,
      nombrePlato: datosNuevos.nombrePlato,
      ingredienteAdicional: datosNuevos.ingredienteAdicional || null,
    };

    return platoActualizado;
  }

  async eliminarPlato(idPlato: string): Promise<IPlato | null> {
    const indicePlato = platos.findIndex((plato) => plato.idPlato === idPlato);

    if(indicePlato === -1){
      return null;
    }
      const [platoEliminado]=platos.splice(indicePlato,1);
      return platoEliminado!;
    
  }
}
