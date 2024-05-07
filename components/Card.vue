<template>
  <div class="card w-full bg-neutral text-neutral-content shadow-xl">
    <div class="card-body">
      <div class="flex items-center gap-5">
        <figure class="rounded-full w-16 h-16">
          <img :src="item.avatar" :alt="item.name">
        </figure>
        <div class="flex flex-col gap-1">
          <h2 class="font-bold">{{ item.name }}</h2>
          <p class="text-sm">{{ item.views }}</p>
          <p><a class="link link-accent" :href="item.website" target="_blank">{{ item.website }}</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '~/types/index.ts';

interface IProps {
  item: Item;
}

defineProps<IProps>()
</script>