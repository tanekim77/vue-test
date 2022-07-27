<script setup lang="ts">
import { computed, reactive } from 'vue';
import Slides from '../components/Slides.vue'
import data from '../data.json';
import FindADealer from '../components/FindADealer.vue';
import Qty from '../components/Qty.vue';
import ColorOptions from '../components/ColorOptions.vue';
import Sizes from '../components/Sizes.vue';

const COLOR_ATTR_ID = 15;
const SIZE_ATTR_ID = 13;
const TEXTURE_ATTR_ID = 48;

let selectedColor = $ref('Pearl White')
let selectedSize = $ref('X-Small')

// Workaround for a bug at https://github.com/vuejs/rfcs/discussions/369
const changeDetactor = reactive({ helper: true });

const item = computed(() => {
  return data.items.filter(item => {
    let textureMatched = true;
    let sanitizedColor = selectedColor;
    if (selectedColor === 'Matte Black') {
      textureMatched = item.attributes.find(attribute =>
        attribute.attributekey_id === TEXTURE_ATTR_ID)?.name === 'Matte';
      sanitizedColor = 'Black';
    }
    const colorMatched = item.attributes.find(attribute =>
      attribute.attributekey_id === COLOR_ATTR_ID)?.name === sanitizedColor
    const sizeMatched = item.attributes.find(attribute =>
      attribute.attributekey_id === SIZE_ATTR_ID)?.name === selectedSize

    changeDetactor.helper = !changeDetactor.helper;
    return textureMatched && colorMatched && sizeMatched;
  })[0];
});


const colorOptions = data.options.color;
const sizeOptions = data.options.size;
const selectColor = (selected: any) => {
  selectedColor = selected.name;
}
const selectSize = (selected: any) => {
  selectedSize = selected.name;
}

</script>

<template>
  <div class="2xl:flex flex-nowrap">
    <div class="grid place-items-center 2xl:w-1/2">
      <Slides :changeDetactor="changeDetactor" :item="item" />
    </div>
    <div class="pl-20 pb-20 pt-10 2xl:w-1/2">
      <div class="flex justify-between w-4/6">
        <h1 class="text-5xl font-bold text-primary uppercase">{{ data.alternate_name }}</h1>
        <h3 class="hidden text-3xl font-bold 2xl:inline-block">${{ item.price }}</h3>
      </div>
      <h2 class="text-4xl font-bold text-primary">{{ item.sku }}</h2>

      <div class="mt-4">
        <h3 class="text-3xl font-bold">
          COLOR OPTIONS:
        </h3>
        <div class="mt-5 max-w-4xl">
          <ColorOptions :options="colorOptions" :selectedOption="selectedColor" :selectOption="selectColor" />
        </div>
      </div>
      <div class="mt-5">
        <h3 class="text-3xl font-bold">
          SIZE:
        </h3>
        <div class="mt-3">
          <Sizes :options="sizeOptions" :selectedOption="selectedSize" :selectOption="selectSize" />
        </div>
      </div>
      <div class="mt-10">
        <h3 class="text-3xl font-bold">
          QTY:
        </h3>
        <div class="mt-5">
          <Qty :item="item" />
        </div>
      </div>
      <div class="mt-10">
        <FindADealer />
      </div>
    </div>
  </div>
</template>
<style>
</style>