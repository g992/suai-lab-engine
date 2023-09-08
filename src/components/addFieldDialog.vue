<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const isDialogVisible = ref(false);
const props = defineProps<{ isOutput: boolean }>();

const symbol = ref('');
const description = ref('');
const postfix = ref('');
const formula = ref('');

const emit = defineEmits<{
  (
    e: 'add',
    symbol: string,
    description: string,
    postfix: string,
    formula?: string
  ): void;
}>();
const emitAdd = () => {
  emit('add', symbol.value, description.value, postfix.value, formula.value);
  isDialogVisible.value = false;
};
watch(symbol, () => {
  symbol.value = symbol.value.replace(/\s/gm, '');
});

const isAddDisable = computed(() => {
  if (!props.isOutput && symbol.value.length == 0) return true;
  else if (
    props.isOutput &&
    symbol.value.length == 0 &&
    formula.value.length == 0
  )
    return true;
  return false;
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
        <q-input class="q-mt-md" label="Величина" v-model="postfix" />
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
          :disable="isAddDisable"
          @click="emitAdd"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
