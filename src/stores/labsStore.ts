import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { Lab } from 'stores/types';
import { useQuasar } from 'quasar';
import { crc16 } from 'crc';

export const useLabsStore = defineStore('counter', () => {
  const $q = useQuasar();

  const labs = ref<Lab[]>([]);
  const editMode = ref(false);
  const selectedLab = ref<Lab | undefined>(undefined);

  const reloadLabs = () => {
    const loadedLabs = $q.localStorage.getItem<Lab[]>('labs');
    if (loadedLabs) {
      labs.value = loadedLabs;
    }
  };

  onMounted(() => {
    reloadLabs();
    const loadedEditMode = $q.localStorage.getItem<boolean>('editMode');
    editMode.value = !!loadedEditMode;
  });

  watch(editMode, (value) => {
    $q.localStorage.set('editMode', value);
  });

  const saveLabs = () => {
    if (selectedLab.value) {
      selectedLab.value.checksum = crc16(
        JSON.stringify(selectedLab.value.lab)
      ).toString(16);
    }
    $q.localStorage.set('labs', labs.value);
  };

  const createLab = (name: string, description: string) => {
    const lab = new Lab();
    lab.name = name;
    lab.description = description;
    labs.value.push(lab);
    saveLabs();
  };

  const selectLabByNameAndDesk = (name: string, desk: string) => {
    const candidate = labs.value.find(
      (x) => x.name === name && x.description === desk
    );
    if (!candidate) return;
    selectedLab.value = candidate;
  };

  return {
    reloadLabs,
    labs,
    editMode,
    createLab,
    selectedLab,
    selectLabByNameAndDesk,
    saveLabs,
  };
});
