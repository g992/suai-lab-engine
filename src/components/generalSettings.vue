<script setup lang="ts">
import { ref } from 'vue';
import { useLabsStore } from 'stores/labsStore';

const labsStore = useLabsStore();
const isDialogVisible = ref(false);
</script>

<template>
  <q-btn flat icon="settings" @click="isDialogVisible = true" />
  <q-dialog v-model="isDialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-h6">Основные настройки</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-toggle label="Режим редактирования" v-model="labsStore.editMode" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
