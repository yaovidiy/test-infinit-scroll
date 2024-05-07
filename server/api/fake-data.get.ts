import { getItems, wait } from "../lib/fakeList";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const prevCursor = +(query.page ?? 0) - 1;
  const nextCursor = +(query.page ?? 0) + 1;

  const items = getItems(25);

  return { items, nextCursor, prevCursor }
})