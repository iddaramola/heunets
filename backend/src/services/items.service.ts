import { WorkItem } from "../models/item.model";
import { randomUUID } from "crypto";

export class ItemService {
  private items: WorkItem[] = [];

  createItem(title: string, description?: string): WorkItem {
    const newItem: WorkItem = {
      id: randomUUID(),
      title,
      description,
      createdAt: new Date().toISOString()
    };
    this.items.push(newItem);
    return newItem;
  }

  listItems(): WorkItem[] {
    return this.items;
  }
}
