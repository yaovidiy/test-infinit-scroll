<template>
  <div class="py-10 px-5 md:py-16 md:px-10 lg:px-16">
    <div v-if="isFetching && !isFetched" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Skeleton v-for="_ in skeletons" :key="_" />
    </div>
    <div v-if="isFetched && result.data?.value?.pages" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card v-for="item in result.data?.value?.pages[0].items" :key="item.name" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
const queryClient = useQueryClient();
const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const fetchProjects = async ({ pageParam = 0 }) => {
  const res = $fetch(`/api/fake-data?page=${pageParam}`);
  return res
}

const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  isPending,
  isFetching,
  isFetched,
  isSuccess,
  ...result
} = useInfiniteQuery({
  initialPageParam: 0,
  queryKey: ['projects'],
  queryFn: fetchProjects,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
})

</script>