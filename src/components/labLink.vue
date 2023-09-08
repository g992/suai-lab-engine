<script setup lang="ts">
import { defineProps } from 'vue';
import { useLabsStore } from 'stores/labsStore';
const props = defineProps<{
  title: string;
  caption: string;
  link: string;
}>();

const labStore = useLabsStore();

const selectLab = () => {
  labStore.selectLabByNameAndDesk(props.title, props.caption);
};
</script>

<template>
  <q-item clickable tag="a" target="_blank" @click="selectLab">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
