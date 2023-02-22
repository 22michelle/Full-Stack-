import Fastify from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import { connectDb } from "./database.js";
import { postRoutes } from "./routes/post.routes.js";

const fastify = Fastify({ logger: true });

fastify.register(connectDb);
fastify.register(cors, { origin: "*" });
fastify.register(formBody);

// RUTAS
fastify.register(postRoutes, { prefix: "/post" });

const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: "0.0.0.0" });
    console.log("Servidor corriendo exitosamente por el puerto 4000");
  } catch (error) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
