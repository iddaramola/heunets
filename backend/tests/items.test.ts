import Fastify from "fastify";
import { itemsRoutes } from "../src/routes/items.route";

describe("Items API", () => {
  const app = Fastify();
  beforeAll(async () => {
    await app.register(itemsRoutes);
    await app.ready();
  });

  it("should create and list items", async () => {
    const create = await app.inject({
      method: "POST",
      url: "/items",
      payload: { title: "Test Item", description: "desc" }
    });
    expect(create.statusCode).toBe(201);

    const list = await app.inject({
      method: "GET",
      url: "/items"
    });
    const data = JSON.parse(list.payload);
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].title).toBe("Test Item");
  });
});
