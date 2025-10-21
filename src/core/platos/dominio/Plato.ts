import { IPlato } from "./IPlato";

export class Plato implements IPlato {
  idPlato: string;
  nombrePlato: string;
  ingredienteAdicional?: string | null;

  /*
{
  //idPlato: 1,
  nombrePlato: "Ensalada",
  ingredienteAdicional: "Tomate"
}
*/

  constructor(datosPlato: Omit<IPlato, "idPlato">, idPlato: string) {
    this.idPlato = idPlato;
    this.nombrePlato = datosPlato.nombrePlato;
    this.ingredienteAdicional = datosPlato.ingredienteAdicional ?? null;
  }
}
