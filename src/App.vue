<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useLabsStore } from 'stores/labsStore';
const $q = useQuasar();
const labsStore = useLabsStore();

onMounted(() => {
  if (!$q.localStorage.has('labs')) {
    $q.localStorage.set('labs', []);
    labsStore.reloadLabs();
  }
});
</script>
