<script setup lang="ts">

defineProps<{
  options?: any,
  selectedOption?: string,
  selectOption?: any
}>()

const dict: { [key: string]: string } = {
  'X-Small': 'XS',
  'Small': 'SM',
  'Medium': 'MD',
  'Large': 'LG',
  'X-Large': 'XL',
  '2X-Large': '2XL',
  '3X-Large': '3XL'
}

</script>

<template>
  <div class="flex w-fit rounded-full border-4 border-gray-200 border-solid text-xl cursor-pointer">
    <div v-for="option in options" :key="option.name" @click="selectOption(option)"
      class="grid place-items-center w-14 h-14 rounded-full" :class="{
        'bg-primary': option.name === selectedOption,
        'text-white': option.name === selectedOption
      }">
      {{ dict[option.name] }}
    </div>
  </div>

</template>
