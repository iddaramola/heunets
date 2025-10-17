import { FastifyInstance } from "fastify";
import { ItemService } from "../services/items.service";

export async function itemsRoutes(app: FastifyInstance) {
  const service = new ItemService();

  app.get("/items", async () => {
    return service.listItems();
  });

  app.post("/items", async (req, reply) => {
    const body = req.body as { title: string; description?: string };
    if (!body?.title) {
      reply.status(400);
      return { error: "Title is required" };
    }
    const item = service.createItem(body.title, body.description);
    reply.status(201);
    return item;
  });
}
