<script setup lang="ts">
import { ref } from 'vue';
import { useLabsStore } from 'stores/labsStore';

const isDialogVisible = ref(false);

const labsStore = useLabsStore();
const name = ref('');
const desc = ref('');

const createLab = () => {
  labsStore.createLab(name.value, desc.value);
  isDialogVisible.value = false;
};
</script>

<template>
  <div class="q-ml-md q-mr-md">
    <q-btn color="primary" style="width: 100%" @click="isDialogVisible = true"
      >Создать новую работу</q-btn
    >
    <q-dialog v-model="isDialogVisible">
      <q-card style="min-width: 40em">
        <q-card-section>
          <div class="text-h6">Создание работы</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="Название работы" v-model="name" />
          <q-input class="q-mt-md" label="Кратное описание" v-model="desc" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup />
          <q-btn
            flat
            label="Создать"
            color="primary"
            @click="createLab"
            :disable="name.length == 0"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped></style>
