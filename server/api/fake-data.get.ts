import { getItems, wait } from "../lib/fakeList";

export default defineEventHandler(async (event) => {
  const items = getItems(25);
  const query = getQuery(event);
  const nextCursor = +(query.page ?? 0) + 1;

  await wait(2000);

  return { items, nextCursor: nextCursor }
})