import { FastifyInstance } from "fastify";
import { PlatosControlador } from "../controladores/PlatosControlador";
import { PlatosCasosUso } from "../../core/platos/aplicacion/casos-uso/PlatosCasosUso";

function platosEnrutador(app: FastifyInstance, platosController: PlatosControlador) {
  app.get("/platos", platosController.obtenerPlatos);
  app.get("/platos/:idPlato", platosController.obtenerPlatoPorId);
  app.post("/platos", platosController.crearPlato);
  app.put("/platos/:idPlato", platosController.actualizarPlato);
  app.delete("/platos/:idPlato", platosController.eliminarPlato);
}

export async function construirPlatosEnrutador(app: FastifyInstance) {
  const platosCasosUso = new PlatosCasosUso();
  const platosController = new PlatosControlador(platosCasosUso);

  platosEnrutador(app, platosController);
}
