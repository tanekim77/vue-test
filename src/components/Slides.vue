<script setup lang="ts">
import { computed, watch } from 'vue';
import data from '../data.json';

const { item, changeDetactor } = defineProps<{
  item: any,
  changeDetactor: any
}>()

let selectedViewIndex = $ref(0);


let selectedImage = computed(() => {
  return item.images[selectedViewIndex];
})

let imageChoices: any[] = $ref([])

const initializeImageChoices = () => {

  if (imageChoices.length) {
    imageChoices.length = 0;
  }

  let currIndex = (selectedViewIndex - 2) % item.images.length;

  if (currIndex < 0) {
    currIndex += item.images.length;
  }

  for (let i = 0; i < 5; i++) {
    imageChoices.push({
      index: currIndex,
      image: item.images[currIndex]
    });

    currIndex = (currIndex + 1) % item.images.length;
  }
}

watch(changeDetactor, () => {
  initializeImageChoices();
});

initializeImageChoices();
let latestManualChangeRun = Date.now();
setInterval(() => {
  if (Date.now() - latestManualChangeRun >= 2000) {
    updateImageChoices(3);
  }
}, 2000)

const updateImageChoices = (indexOfChoice: number, isManual = false) => {
  if (isManual) {
    latestManualChangeRun = Date.now();
  }
  const index = imageChoices[indexOfChoice].index;
  if (indexOfChoice === 1) {
    selectedViewIndex = index;
    const indexOfInterest = imageChoices[0].index;
    const indexToPush = indexOfInterest === 0 ? item.images.length - 1 : indexOfInterest - 1
    imageChoices.unshift({
      index: indexToPush,
      image: item.images[indexToPush]
    });
    imageChoices.pop();
  } else if (indexOfChoice === 3) {
    selectedViewIndex = index;
    const indexOfInterest = imageChoices[imageChoices.length - 1].index;
    const indexToPush = indexOfInterest === item.images.length - 1 ? 0 : indexOfInterest + 1
    imageChoices.push({
      index: indexToPush,
      image: item.images[indexToPush]
    });
    imageChoices.shift();
  }
}

const toPrev = () => {
  latestManualChangeRun = Date.now();
  selectedViewIndex =
    selectedViewIndex === 0
      ? item.images.length - 1
      : selectedViewIndex - 1
}

const toNext = () => {
  latestManualChangeRun = Date.now();
  selectedViewIndex =
    selectedViewIndex === item.images.length - 1
      ? 0
      : selectedViewIndex + 1
}


</script>

<template>

  <div class="sm-screen w-full 2xl:hidden">
    <div class="w-full flex flex-nowrap flex-col items-center bg-primary">
      <h1 class="text-6xl text-white font-bold mt-20 uppercase text-center">{{ data.alternate_name }}</h1>
      <div class="sm-container w-full flex justify-between items-center px-10 mt-20">
        <button @click="toPrev"
          class="flex items-center justify-center w-10 h-10 rounded-full bg-white font-bold text-4xl font-mono border-2 border-primary border-solid">
          &larr;
        </button>
        <div class="w-4/5 h-4/5 grid place-items-center h-96">
          <Transition name="fade">
            <img :src="selectedImage" :key="item.images[selectedViewIndex]" class="max-h-96" />
          </Transition>
        </div>
        <button @click="toNext"
          class="flex items-center justify-center w-10 h-10 rounded-full bg-white font-bold text-4xl font-mono border-2 border-primary border-solid">
          &rarr;
        </button>
      </div>
    </div>
    <div class="w-full flex items-center justify-center uppercase mt-16">
      <div class="h-0.5 bg-primary w-4/6"></div>
      <div class="bg-primary text-white rounded-full px-5 py-1 font-bold">
        <p>${{ item.price }}</p>
      </div>
    </div>
  </div>

  <div class="lg-screen h-full hidden 2xl:block">
    <div class="w-full h-full flex items-center gap-10">

      <div class="flex flex-col btn-icon gap-5 relative top-0 left-0 relative">
        <TransitionGroup name="btn-icon">
          <template v-for="({ image, index }, indexOfChoice) in imageChoices" :key="index">
            <div class="cursor-pointer border-solid border-4 border-grey-200 rounded-full p-3" :class="{
              ['border-primary']: indexOfChoice === 2
            }" @click="updateImageChoices(indexOfChoice, true)">
              <img :src="image" class="h-20 w-20" />
            </div>
          </template>
        </TransitionGroup>
        <div class="absolute w-32 h-32 bg-white"></div>
        <div class="absolute w-32 h-32 bg-white bottom-0"></div>
      </div>
      <div class="border-solid border-4 border-grey-200 rounded-2xl p-10">
        <img :src="selectedImage" class="h-128 w-128" />
      </div>
    </div>
  </div>
</template>


<style>
.sm-screen {
  .sm-container {
    background: linear-gradient(to bottom,
        var(--primary) 0%,
        var(--primary) 50%,
        #FFF 50%,
        #FFF 100%);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-leave-active {
    position: absolute;
    display: none;
  }
}

.lg-screen {
  .btn-icon-move {
    transition: all 0.5s ease;
  }

  .btn-icon-enter-from,
  .btn-icon-leave-to {
    opacity: 0;
    left: 100vw;
    border-width: 0;
  }

  .btn-icon-leave-active {
    position: absolute;
  }
}
</style>