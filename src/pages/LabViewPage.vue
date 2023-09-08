<script setup lang="ts">
import { useLabsStore } from 'stores/labsStore';
import AddFieldDialog from 'components/addFieldDialog.vue';
import LabField from 'components/labField.vue';
import { ref } from 'vue';
import * as math from 'mathjs';
const labStore = useLabsStore();

const processAddInput = (
  symbol: string,
  description: string,
  postfix: string
) => {
  console.log('Adding input, ', symbol, description);
  labStore.selectedLab?.lab.inputs.push({ symbol, description, postfix });

  labStore.saveLabs();
};
const processAddOutput = (
  symbol: string,
  description: string,
  postfix: string,
  formula: string
) => {
  console.log('Adding output, ', symbol, description);
  labStore.selectedLab?.lab.outputs.push({
    symbol,
    description,
    postfix,
    formula,
  });

  labStore.saveLabs();
};

const removeField = (
  type: 'input' | 'output',
  symbol: string,
  description: string
) => {
  if (!labStore.selectedLab) return;
  if (type === 'input')
    labStore.selectedLab.lab.inputs = labStore.selectedLab.lab.inputs.filter(
      (x) => !(x.symbol === symbol && x.description === description)
    );
  if (type === 'output')
    labStore.selectedLab.lab.outputs = labStore.selectedLab.lab.outputs.filter(
      (x) => !(x.symbol === symbol && x.description === description)
    );
  labStore.saveLabs();
};

const deleteSelectedLab = () => {
  labStore.labs = labStore.labs.filter(
    (x) =>
      !(
        x.name === labStore.selectedLab?.name &&
        x.description === labStore.selectedLab?.description
      )
  );
  labStore.saveLabs();
  labStore.selectedLab = undefined;
  isDeleteDialogVisible.value = false;
};

const isDeleteDialogVisible = ref(false);

const inputs = ref();
const outputs = ref();

const getScope = () => {
  const scope: any = {};
  for (const input of inputs.value) {
    scope[input.symbol] = Number(input.value);
  }
  return scope;
};

const getExpressions = () => {
  const expressions: { symbol: string; expression: string }[] = [];
  for (const output of outputs.value) {
    const symbol = output.symbol;
    const field = labStore.selectedLab?.lab.outputs.find(
      (x) => x.symbol === symbol
    );
    if (!field) continue;
    expressions.push({ symbol, expression: field.formula });
  }
  return expressions;
};

const evaluate = () => {
  const scope = getScope();
  const formulas = getExpressions();
  for (const formula of formulas) {
    const result = math.evaluate(formula.expression, scope);
    const output = outputs.value.find((x) => x.symbol === formula.symbol);
    scope[formula.symbol] = result;
    if (!output) continue;
    output.setValue(result);
  }
};
</script>

<template>
  <q-dialog v-model="isDeleteDialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-h6">Удаление работы</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Вы действительно хотите удалить работу? Действие отменить невозможно.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="primary" v-close-popup />
        <q-btn
          flat
          label="Удалить"
          color="primary"
          @click="deleteSelectedLab"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <div v-if="!labStore.selectedLab" class="text-center q-mt-lg text-h5">
    Выберите работу в списке слева
  </div>
  <div v-else>
    <q-card class="q-ma-md">
      <q-card-section class="q-pb-none">
        <div class="text-h4 text-center">
          {{ labStore.selectedLab?.name }} ({{
            labStore.selectedLab?.checksum
          }})
          <q-btn
            v-if="labStore.editMode"
            icon="delete"
            flat
            color="red"
            @click="isDeleteDialogVisible = true"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-card class="q-ma-md">
          <q-card-section>
            <div class="text-h6">Входные данные</div>
          </q-card-section>
          <q-card-section>
            <div class="fields">
              <lab-field
                class="item"
                v-for="input of labStore.selectedLab?.lab.inputs"
                :key="input"
                :input="input"
                :is-edit-mode="labStore.editMode"
                ref="inputs"
                @remove="removeField('input', input.symbol, input.description)"
              />
              <div v-if="labStore.editMode" style="align-self: center">
                <add-field-dialog
                  class="item"
                  :is-output="false"
                  @add="processAddInput"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <div class="row full-width">
          <q-space />
          <q-btn
            style="align-self: center"
            @click="evaluate"
            label="Рассчитать"
            color="primary"
          />
          <q-space />
        </div>

        <q-card class="q-ma-md">
          <q-card-section>
            <div class="text-h6">Выходные данные</div>
          </q-card-section>
          <q-card-section>
            <div class="fields">
              <lab-field
                class="item"
                ref="outputs"
                v-for="input of labStore.selectedLab?.lab.outputs"
                :key="input"
                is-output
                :input="input"
                :is-edit-mode="labStore.editMode"
                @remove="removeField('output', input.symbol, input.description)"
              />
              <div v-if="labStore.editMode" style="align-self: center">
                <add-field-dialog
                  class="item"
                  is-output
                  @add="processAddOutput"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
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
