import { getItems, wait } from "../lib/fakeList";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const prevCursor = +(query.page ?? 0) - 1;
  const nextCursor = +(query.page ?? 0) + 1;

  if (prevCursor < 0) {
    return { items: [], nextCursor, prevCursor: 0 }
  }

  if (nextCursor > 1000) {
    return { items: [], nextCursor: 1000, prevCursor }
  }

  const items = getItems(25);

  return { items, nextCursor, prevCursor }
})