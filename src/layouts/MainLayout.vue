<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> SUAI LabEngine </q-toolbar-title>
        <general-settings />
        <!--        <div>Quasar v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Список работ </q-item-label>

        <lab-link
          v-for="lab in labStore.labs"
          :key="lab"
          :title="lab.name"
          :link="lab.checksum"
          :caption="lab.description"
        />
        <div
          style="width: 100%"
          class="flex-center q-mt-md"
          v-if="labStore.editMode"
        >
          <new-lab-dialog />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GeneralSettings from 'components/generalSettings.vue';
import { useLabsStore } from 'stores/labsStore';
import LabLink from 'components/labLink.vue';
import NewLabDialog from 'components/newLabDialog.vue';

const leftDrawerOpen = ref(false);
const labStore = useLabsStore();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
