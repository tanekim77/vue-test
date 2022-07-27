<script setup lang="ts">

defineProps<{
  item?: any,
}>()

let qty = $ref(1);
</script>

<template>

  <div class="flex gap-5 flex-wrap 2xl:flex-nowrap 2xl:w-2/3">
    <div class="flex rounded-full border-4 border-gray-200 border-solid items-center w-5/12 text-center min-w-64">
      <div class="border-r-4 border-gray-200 border-solid text-3xl py-3 cursor-pointer text-center w-1/3"
        @click="qty = Math.max(1, qty - 1)">
        -
      </div>
      <div class="text-xl w-1/3 text-center">
        {{ qty }}
      </div>
      <div class="border-l-4 border-gray-200 border-solid text-3xl py-3 cursor-pointer text-center w-1/3"
        @click="qty++">
        +
      </div>
    </div>
    <button class="bg-primary rounded-full text-white py-5 font-semibold w-5/12 min-w-64">
      ADD TO CART
    </button>
  </div>
</template>

<style>
</style>