<script setup lang="ts">
import { useLabsStore } from 'stores/labsStore';
import AddFieldDialog from 'components/addFieldDialog.vue';

const labStore = useLabsStore();

const processAddInput = (symbol: string, description: string) => {
  console.log('Adding input, ', symbol, description);
};
</script>

<template>
  <div v-if="!labStore.selectedLab" class="text-center q-mt-lg text-h5">
    Выберите работу в списке слева
  </div>
  <div v-else>
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Входные данные</div>
      </q-card-section>
      <q-card-section>
        <div class="fields">
          <div v-if="labStore.editMode">
            <add-field-dialog
              class="item"
              :is-output="false"
              @add="processAddInput"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Выходные данные</div>
      </q-card-section>
      <q-card-section>
        <div class="fields">
          <div v-if="labStore.editMode">
            <add-field-dialog class="item" is-output @add="processAddInput" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.fields {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.item {
  margin: 1em;
}
</style>
