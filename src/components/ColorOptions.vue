<script setup lang="ts">

defineProps<{
  options?: any,
  selectedOption?: string,
  selectOption?: any
}>();

</script>

<template>
  <div class="grid grid-cols-3 gap-y-5 w-4/5 2xl:w-2/3">
    <div v-for="option in options" :key="option.image" class="flex" @click="selectOption(option)">
      <div class="flex flex-col items-center group">
        <button
          class="duration-300 shadow-grey-500/50 w-24 h-24 cursor-pointer border-solid rounded-full border-4 p-3 grid place-items-center "
          :class="{ 'shadow-lg': selectedOption === option.name, '-translate-y-2': selectedOption === option.name }">
          <img :src="option.image" />
        </button>
        <Transition name="fade">
          <label
            class="duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 text-black font-bold">
            {{
                option.name
            }}</label>
        </Transition>
      </div>
    </div>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 10s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
  display: none;
}
</style>