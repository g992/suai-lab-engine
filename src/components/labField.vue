<script setup lang="ts">
import { LabInput } from 'stores/types';
import { ref } from 'vue';

const props = defineProps<{
  input: LabInput;
  isEditMode: boolean;
  isOutput?: boolean;
}>();
const value = ref(0);
const emit = defineEmits<{
  (e: 'remove'): void;
}>();
const remove = () => {
  emit('remove');
};

defineExpose({
  value,
  symbol: props.input.symbol,
  setValue: (x: number) => (value.value = x),
});
</script>

<template>
  <div class="column q-pa-md rounded-borders" style="border: 1px solid #1d1d1d">
    <div class="row" v-if="isEditMode">
      <q-space />
      <q-btn flat icon="delete" size="sm" @click="remove" />
    </div>
    <div class="row">
      <q-input
        type="number"
        :hint="input.description"
        v-model="value"
        :disable="isOutput"
      >
        <template v-slot:before> {{ input.symbol }} </template>
        <template v-slot:after>
          {{ input.postfix }}
        </template>
        <template v-slot:hint>
          {{ input.description }}
        </template>
      </q-input>
    </div>
  </div>
</template>

<style scoped></style>
