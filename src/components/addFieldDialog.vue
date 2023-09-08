<script setup lang="ts">
import { ref, watch } from 'vue';

const isDialogVisible = ref(false);
defineProps<{ isOutput: boolean }>();

const symbol = ref('');
const description = ref('');
const formula = ref('');
const emit = defineEmits<{
  (e: 'add', symbol: string, description: string, formula?: string): void;
}>();
const emitAdd = () => {
  emit('add', symbol.value, description.value, formula.value);
  isDialogVisible.value = false;
};
watch(symbol, () => {
  symbol.value = symbol.value.replace(/\s/gm, '');
});
</script>

<template>
  <q-btn icon="add" style="width: 10em" @click="isDialogVisible = true" />
  <q-dialog v-model="isDialogVisible">
    <q-card style="width: 30em">
      <q-card-section>
        <div class="text-h6">
          {{ isOutput ? 'Новое выходное значение' : 'Новое поле ввода' }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input label="Имя переменной" v-model="symbol" />
        <q-input class="q-mt-md" label="Описание" v-model="description" />
        <q-input
          class="q-mt-md"
          label="Формула"
          v-if="isOutput"
          v-model="formula"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="primary" v-close-popup />
        <q-btn
          flat
          label="Добавить"
          color="primary"
          :disable="symbol.length == 0 || !isOutput || formula.length == 0"
          @click="emitAdd"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
