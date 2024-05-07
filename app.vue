<template>
  <span class="fixed top-10 left-5 z-10 bg-primary text-primary-content p-3 rounded-full">{{ allItems?.length }}</span>
  <span class="fixed top-32 left-5 z-10 bg-primary text-primary-content p-3 rounded-full">{{
    result.data.value?.pages?.length }}</span>
  <div class="py-10 px-5 md:py-16 md:px-10 lg:px-16">
    <div v-if="isFetching && !isFetched" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Skeleton v-for="_ in skeletons" :key="_" />
    </div>
    <div v-if="isFetched && result.data?.value?.pages" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div ref="loaderTopEl" class="absolute top-0 opacity-0 -z-50">
      </div>
      <Card v-for="item in allItems" :key="item.uuid" :item="item" />
      <span v-if="isFetchingNextPage" class="loading loading-ring loading-lg"></span>
      <div ref="loaderBottomEl" class="opacity-0 -z-50">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const loaderTopEl = ref<HTMLElement | null>(null);
const loaderBottomEl = ref<HTMLElement | null>(null);

const allItems = computed(() => {
  const flattenItems = result.data.value?.pages.flatMap(page => page.items);
  let startIndex = flattenItems ? flattenItems.length - 76 : 0;

  if (flattenItems && flattenItems.length < 75) {
    return flattenItems;
  }

  if (startIndex < 0) {
    startIndex = 0;
  }

  return flattenItems?.slice(startIndex);
});

const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetching,
  isFetched,
  isSuccess,
  ...result
} = useInfiniteQuery({
  initialPageParam: 0,
  queryKey: ['projects'],
  queryFn: fetchProjects,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
})

async function fetchProjects({ pageParam = 0 }) {
  const res = $fetch(`/api/fake-data?page=${pageParam}`);
  return res
}

useIntersectionObserver(loaderBottomEl, onIntersectionObserver, { rootMargin: '600px' })
useIntersectionObserver(loaderTopEl, onTopIntersectionObserver, { rootMargin: '600px' })

function onTopIntersectionObserver([{ isIntersecting }]: IntersectionObserverEntry[]) {
  if (isIntersecting && hasPreviousPage) {
    fetchPreviousPage();
  }
}

function onIntersectionObserver([{ isIntersecting }]: IntersectionObserverEntry[]) {
  if (isIntersecting && hasNextPage) {
    fetchNextPage();
  }
}
</script>