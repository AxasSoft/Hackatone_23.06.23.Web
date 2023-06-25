<template>
  <v-card class="d-flex" v-if="dataProject">
    <v-card elevation="0" class="w-60">
      <v-window v-model="window" show-arrows>
        <v-window-item v-for="n in images" :key="n">
          <v-card height="400px" class="d-flex justify-center align-center">
            <v-img :src="n" cover></v-img>
          </v-card>
        </v-window-item>
      </v-window>
      <v-card elevation="0" color="background" class="pb-2">
        <v-card-title>Характеристики</v-card-title>
        <v-card-subtitle
          >Кадастровый номер:
          {{ dataProject.cadastral_number }}</v-card-subtitle
        >
        <v-card-subtitle>Статус: Сбор урожая </v-card-subtitle>
        <v-card-subtitle>Год насаждения: 2017 </v-card-subtitle>
        <v-card-subtitle>Сорт: {{ dataProject.sort }} </v-card-subtitle>
        <v-card-subtitle>Площадь: {{ dataProject.area }} m2 </v-card-subtitle>
        <v-card-subtitle>Cлой земли: {{ dataProject.soil }} </v-card-subtitle>
      </v-card>
      <v-card elevation="0" color="background" class="pb-2 mt-4">
        <v-card-title>Описание</v-card-title>
        <v-card-text>{{ dataProject.description }}</v-card-text>
      </v-card>

      <v-card elevation="0" color="background" class="pb-2 mt-4">
        <v-card-title>Документация</v-card-title>
        <v-card-text>
          <v-card-item class="d-flex align-center">
            <v-icon icon="mdi-file-document" color="primary"></v-icon>
            Можжевой план земельного участка
          </v-card-item>
          <v-card-item class="d-flex align-center">
            <v-icon icon="mdi-file-document" color="primary"></v-icon>
            Заявление о государственном кадастровом учете
          </v-card-item>
          <v-card-item class="d-flex align-center">
            <v-icon icon="mdi-file-document" color="primary"></v-icon>
            Кадастровый паспорт объекта
          </v-card-item>
        </v-card-text>
      </v-card>
      <v-tabs
        v-model="tab"
        bg-color="none"
        color="primary"
        slider-color="primary"
        class="mt-4"
      >
        <v-tab class="text-none" :value="1">Комментарии</v-tab>
      </v-tabs>
      <v-card elevation="0" color="background">
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item :value="1">
              <v-card elevation="0" color="background" class="d-flex">
                <v-img
                  max-width="27"
                  cover
                  height="27"
                  class="rounded-circle mr-1"
                  src="https://cuad.ask.fm/assets2/126/620/440/576/normal/file.jpg"
                >
                </v-img>
                <v-card elevation="0" color="background">
                  <v-card elevation="0" class="ml-4">
                    <v-card
                      color="white"
                      elevation="0"
                      class="d-flex align-center"
                    >
                      <v-card-title class="text-subtitle-2 pa-0 pl-4 pr-4"
                        >Алексей Тихорецкий</v-card-title
                      >
                      <v-card-subtitle>23.03.2023 11:28</v-card-subtitle>
                    </v-card>
                    <v-card-text>
                      С другой стороны постоянный количественный рост и сфера
                      нашей активности обеспечивает широкому кругу
                      (специалистов) участие в формировании соответствующий
                      условий активизации.
                    </v-card-text>
                  </v-card>
                  <v-card-actions class="">
                    <v-btn
                      density="compact"
                      class="text-none ml-2"
                      color="primary"
                      >Ответить</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card elevation="0" class="ml-4 w-40 d-flex flex-column align-center">
      <v-card elevation="0" color="background" class="w-100">
        <v-card-title>{{ dataProject.name }}</v-card-title>
        <v-card-text
          >Краснодарский край, Краснодар, Карасунский, ул. Пашковский Перекат,
          44.994026°, 39.095512°</v-card-text
        >
        <v-card-text
          class="d-flex align-center justify-space-between w-100 pa-0 mb-2"
        >
          <v-card-subtitle class="pt-0 pb-0">Агроном</v-card-subtitle>
          <v-card-text class="text-right pt-0 pb-0">{{
            (dataProject.user.first_name ?? "") +
            " " +
            (dataProject.user.last_name ?? "")
          }}</v-card-text>
        </v-card-text>

        <v-card-text
          class="d-flex align-center justify-space-between w-100 pa-0 mb-2"
        >
          <v-card-subtitle class="pt-0 pt-0 pb-0">Температура</v-card-subtitle>
          <v-card-text class="text-right text-h6 pt-0 pb-0"
            >{{ dataProject.temperature }}℃</v-card-text
          >
        </v-card-text>

        <v-card-text
          class="d-flex align-center justify-space-between w-100 pa-0 mb-2"
        >
          <v-card-subtitle class="pt-0 pb-0">Влажность</v-card-subtitle>
          <v-card-text class="text-right text-h6 pt-0 pb-0"
            >{{ dataProject.humidity }}%</v-card-text
          >
        </v-card-text>

        <v-card
          elevation="0"
          color="background"
          class="d-flex pa-4 pt-6 pb-6 align-center justify-space-between w-100"
        >
          <v-btn color="primary" class="text-none" width="230"
            >Создать задачу</v-btn
          >
          <v-btn
            color="primary"
            class="text-none"
            variant="outlined"
            width="230"
            >История участка</v-btn
          >
        </v-card>
      </v-card>
      <v-btn
        color="primary"
        class="text-none mt-4"
        variant="outlined"
        width="430"
        >Перейти к задачам участка</v-btn
      >
    </v-card>
  </v-card>
</template>

<script>
import { onMounted, ref } from "vue";
import { locations } from "@/compositions/locations.js";
import { useRoute } from "vue-router";
export default {
  setup() {
    const tab = ref(1);
    const { getSelectLocation } = locations();
    const dataProject = ref(null);
    const route = useRoute();
    onMounted(() => {
      getSelectLocation(route.params.id).then((r) => {
        dataProject.value = r.data.data;
      });
    });
    return {
      tab,
      dataProject,
    };
  },
  data: () => ({
    images: [
      "https://sun9-12.userapi.com/impg/bOaFWUOrgdrM_15v_r72qRR6pvP4gzZwZ1Obyg/M1t_nEvsmHk.jpg?size=1280x830&quality=96&sign=e3415f340843cdfa88eff3645f7ba6a2&c_uniq_tag=5DhqbHXNscH4V5_v4xaTS58e7DzAQo4AbLEkZkDrObA&type=album",
      "https://wsemoboi.ru/image/catalog/oboi/affresco/freski-i-fotooboi/51044_panno-affresco-kollektsiya-freski-i-fotooboi-artikul-id13448.jpg",
      "https://fotooboimoi.ru/upload/iblock/387/387530c10bfda8c953396121af3f84c2.jpg",
    ],
    window: 0,
  }),
};
</script>