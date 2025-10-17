import Fastify from "fastify";
import dotenv from "dotenv";
import corsPlugin from "./plugins/cors";
import { itemsRoutes } from "./routes/items.route";

dotenv.config();

const app = Fastify({ logger: true });

app.register(corsPlugin);
app.register(itemsRoutes);

const PORT = process.env.PORT || 4000;

app.listen({ port: Number(PORT), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`🚀 Server running at ${address}`);
});
