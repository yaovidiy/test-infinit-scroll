import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import type { Item } from "../../types";

export function getItems(amountOfItems: number) {
  const items: Item[] = [];

  for (let i = 0; i < amountOfItems; i++) {
    const item: Item = {
      uuid: uuidv4(),
      avatar: faker.image.avatar(),
      name: faker.person.fullName(),
      website: faker.internet.url(),
      views: faker.number.int({ min: 1, max: 150000 })
    }

    items.push(item);
  }

  return items;
}

export function wait(timeout: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
