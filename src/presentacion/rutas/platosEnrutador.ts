import { FastifyInstance } from "fastify";
import { PlatosControlador } from "../controladores/PlatosControlador";
import { PlatosCasosUso } from "../../core/platos/aplicacion/casos-uso/PlatosCasosUso";


//* 3. Se definen las rutas
function platosEnrutador(app: FastifyInstance, platosController: PlatosControlador) {
  app.get("/platos", platosController.obtenerPlatos);
  app.get("/platos/:idPlato", platosController.obtenerPlatoPorId);
  app.post("/platos", platosController.crearPlato); //* Esto le dice a Fastify: "Cuando llegue una petición POST a /api/platos, ejecuta la función crearPlato que está dentro de platosController
  app.put("/platos/:idPlato", platosController.actualizarPlato);
  app.delete("/platos/:idPlato", platosController.eliminarPlato);
}

export async function construirPlatosEnrutador(app: FastifyInstance) {
  const platosCasosUso = new PlatosCasosUso(); //* 1. Se crea la implementación de los casos de uso
  const platosController = new PlatosControlador(platosCasosUso); //*  2. Se crea el controlador y se le "inyecta" los casos de uso

  platosEnrutador(app, platosController);
}
