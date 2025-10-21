import { FastifyRequest, FastifyReply } from "fastify";
import { IPlato } from "../../core/platos/dominio/IPlato";
import { IPlatosCasosUso } from "../../core/platos/aplicacion/casos-uso/IPlatosCasosUso";
import { PlatoDTO, CrearPlatoEsquema } from "../esquemas/platoEsquema";
import { ZodError } from "zod";

export class PlatosControlador {
  constructor(private platosCasosUso: IPlatosCasosUso) {}

  obtenerPlatos = async (
    request: FastifyRequest<{ Querystring: { limite?: number } }>,
    reply: FastifyReply
  ) => {
    try {
      const { limite } = request.query;
      const platosEncontrados = await this.platosCasosUso.obtenerPlatos(limite);

      return reply.code(200).send({
        mensaje: "Platos encontrados correctamente",
        platos: platosEncontrados,
        totalPlatos: platosEncontrados.length,
      });
    } catch (err) {
      return reply.code(500).send({
        mensaje: "Error al obtener los platos",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  obtenerPlatoPorId = async (
    request: FastifyRequest<{ Params: { idPlato: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { idPlato } = request.params;
      const platoEncontrado = this.platosCasosUso.obtenerPlatoPorId(idPlato);

      if (!platoEncontrado) {
        return reply.code(404).send({
          mensaje: "Plato no encontrado",
        });
      }

      return reply.code(200).send({
        mensaje: "Plato encontrado correctamente",
        plato: platoEncontrado,
      });
    } catch (err) {
      return reply.code(500).send({
        mensaje: "Error al obtener el plato",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  crearPlato = async (
    request: FastifyRequest<{ Body: PlatoDTO }>,
    reply: FastifyReply
  ) => {
    try {
      const nuevoPlato = CrearPlatoEsquema.parse(request.body);
      const idNuevoPlato = await this.platosCasosUso.crearPlato(nuevoPlato);

      return reply.code(200).send({
        mensaje: "El plato se creó correctamente",
        idNuevoPlato: idNuevoPlato,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.code(400).send({
          mensaje: "Error crear un nuevo plato",
          error: err.issues[0]?.message || "Error desconocido",
        });
      }
      return reply.code(500).send({
        mensaje: "Error crear un nuevo plato",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };

  actualizarPlato = async (
    request: FastifyRequest<{ Params: { idPlato: string }; Body: IPlato }>,
    reply: FastifyReply
  ) => {
    try {
      const { idPlato } = request.params;
      const nuevoPlato = request.body;
      const platoActualizado = await this.platosCasosUso.actualizarPlato(
        idPlato,
        nuevoPlato
      );

      if (!platoActualizado) {
        return reply.code(404).send({
          mensaje: "Plato no encontrado",
        });
      }

      return reply.code(200).send({
        mensaje: "Plato actualizado correctamente",
        platoActualizado: platoActualizado,
      });
    } catch (err) {
      return reply.code(500).send({
        mensaje: "Error al actualizar el plato",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  eliminarPlato = async (
    request: FastifyRequest<{ Params: { idPlato: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { idPlato } = request.params;
      await this.platosCasosUso.eliminarPlato(idPlato);

      return reply.code(200).send({
        mensaje: "Plato eliminado correctamente",
      });
    } catch (err) {
      return reply.code(500).send({
        mensaje: "Error al eliminar el plato",
        error: err instanceof Error ? err.message : err,
      });
    }
  };
}
