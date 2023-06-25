<!-- <template>
  <iframe
    src="https://yandex.ru/map-widget/v1/?um=constructor%3A661bcbc94d828463145a6a96b5832306ec4362a9dc16b7c11a4d9387ecc0ff8b&amp;source=constructor"
    width="100%"
    height="720"
    frameborder="0"
  >
  </iframe>
  <v-col cols="auto">
    <v-dialog transition="dialog-top-transition" width="">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">Создать задачу</v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <ProjectDialog />
      </template>
    </v-dialog>
  </v-col>
</template>

<script>
import ProjectDialog from "@/components/ProjectDialog.vue";
import { yandexMap, ymapMarker } from "vue-yandex-maps";

export default {
  components: { yandexMap, ymapMarker, ProjectDialog },
};
</script> -->

<template>
  <yandex-map :coords="coords">
    <ymap-marker
      v-for="(polygon, index) in polygons"
      :key="index"
      :marker-id="polygon.id"
      marker-type="Polygon"
      :coords="polygon.border"
      :markerFill="{ color: '#99b8ff75' }"
      @click="onClick(polygon)"
    ></ymap-marker>
  </yandex-map>
  <v-col cols="auto">
    <v-dialog
      transition="dialog-top-transition"
      width=""
      v-model="isActive"
      @click="closeDialog"
    >
      <ProjectDialog
        @click.stop
        @close="closeDialog"
        :propsData="activePolygon"
      />
    </v-dialog>
  </v-col>
</template>

<script>
import ProjectDialog from "@/components/ProjectDialog.vue";
import { locations } from "@/compositions/locations.js";
export default {
  components: { ProjectDialog },
  data: () => ({
    settings: {
      apiKey: "5050011e-f8a4-4b8f-b989-98479f0acb4b",
      lang: "ru_RU",
      coordorder: "latlong",
      version: "2.1",
    },
    coords: [44.540892, 38.081614],
    maptype: "satellite",
    polygons: [],
    isActive: false,
    activePolygon: {},
  }),
  mounted() {
    locations()
      .getLocations()
      .then((r) => {
        this.polygons = r.data.data;
        this.polygons.forEach((el) => {
          el.border = [el.border];
        });
        this.coords[0] = r.data.data[0].lat;
        this.coords[1] = r.data.data[0].lon;
      });
  },
  methods: {
    closeDialog() {
      this.isActive = false;
    },
    onClick(data) {
      this.activePolygon = data;
      this.isActive = true;
    },
  },
};
</script>

<style>
.ymap-container {
  height: 100vh;
  width: 100%;
}
</style>