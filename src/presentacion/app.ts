import Fastify from "fastify";
import { FastifyError } from "fastify";
import { construirPlatosEnrutador } from "./rutas/platosEnrutador";

const app = Fastify({ logger: true });

app.register(
  async (appInstance) => {
    construirPlatosEnrutador(appInstance);
  },
  { prefix: "/api" }
);

export const startServer = async (): Promise<void> => {
  try {
    await app.listen({ port: 3000 });
    app.log.info("El servidor esta corriendo...");
  } catch (err) {
    app.log.error(`Error al ejecutar el servidor\n ${err}`);

    const serverError: FastifyError = {
      code: "FST_ERR_INIT_SERVER",
      name: "ServidorError",
      statusCode: 500,
      message: `El servidor no se pudo iniciar: ${(err as Error).message}`,
    };

    throw serverError;
  }
};
