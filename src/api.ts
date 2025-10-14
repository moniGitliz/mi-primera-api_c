import Fastify from "fastify";

const app = Fastify({ logger: true });

// Menú
interface Plato {
  id: string;
  nombrePlato: string;
  nuevoIngrediente?: string;
}

let menu: Plato[] = [
  { id: "1", nombrePlato: "Sopa de verduras" },
  { id: "2", nombrePlato: "Arroz con pollo" },
  { id: "3", nombrePlato: "Carne a la plancha" },
  { id: "4", nombrePlato: "Ensalada mixta" },
];

let ordenes: Plato[] = [];
// Endpoints - API

// Pedir el menú
app.get("/", (_, reply) => {
  reply.code(200).send({
    mensaje: "Menú dispoinible",
    data: menu,
  });
});

// Pedir un plato del menú
app.get("/:id", (request, reply) => {
  const { id } = request.params as { id: string };
  const plato = menu.find((plato) => plato.id === id);

  if (!plato) {
    reply.code(404).send({
      mensaje: "Plato no disponible",
    });
  }

  reply.code(200).send({
    mensaje: "Información del plato",
    data: plato,
  });
});

// Solicitar
app.post("/", (request, reply) => {
  const body = request.body as { id: string; nombrePlato: string };
  ordenes.push(body);
  reply.code(200).send({
    mensaje: "Orden agregada",
    ordenes: ordenes,
  });
});

// Modificar orden
app.put("/:id", (request, reply) => {
  const { id } = request.params as { id: string };
  const orden = ordenes.find((plato) => plato.id === id);
  const { nuevoIngrediente } = request.body as { nuevoIngrediente: string };

  if (!orden) {
    return reply.code(404).send({ mensaje: "Plato no encontrado" });
  }

  orden.nuevoIngrediente = nuevoIngrediente;

  reply.code(200).send({
    message: "Se actualizo la orden",
    ordenes: ordenes,
  });
});

// Eliminar orden
app.delete("/:id", (request, reply) => {
  const { id } = request.params as { id: string };
  const index = ordenes.findIndex((plato) => plato.id === id);

  // Validar que exista
  if (index === -1) {
    return reply.code(404).send({
      mensaje: "Orden no encontrada",
    });
  }

  // Eliminar el plato del arreglo
  const [ordenEliminada] = ordenes.splice(index, 1);

  reply.code(200).send({
    mensaje: "Orden eliminada correctamente",
    ordenes,
  });
});

// Servidor

export const startServer = async () => {
  try {
    await app.listen({ port: 3000 });
    app.log.info("El servidor esta corriendo...");
  } catch (err) {
    app.log.error(`Error al ejecutar el servidor\n ${err}`);
    process.exit(1);
  }
};
