<template>
  <v-card width="400" class="d-flex pa-4">
    <v-img
      max-width="388"
      cover
      height="242"
      :src="
        dataPolygon.cover ?? 'https://amwine.ru/upload/blog/28-03-2019/28-1.jpg'
      "
    >
      <div class="w-100 d-flex justify-end">
        <v-btn icon="mdi-close" class="" @click="closeDialog"></v-btn>
      </div>
    </v-img>
    <v-card-title>{{ dataPolygon.name }}</v-card-title>
    <v-card-title class="text-subtitle-2 pt-0"
      >Сорт: <span>{{ dataPolygon.sort }}</span></v-card-title
    >
    <v-card color="background" elevation="0" v-if="dataPolygon.last_warning">
      <v-card-title class="text-subtitle-1 d-flex align-center">
        <v-icon
          icon="mdi-alert-outline"
          size="small"
          color="orange-lighten-2
"
          class="mr-2"
        ></v-icon>
        {{ dataPolygon.last_warning.title }}</v-card-title
      >
      <v-card-subtitle class="pt-0 pb-0">{{
        new Date(dataPolygon.last_warning.created * 1000).toLocaleDateString()
      }}</v-card-subtitle>
      <v-card-text class="pt-0 pb-1 text-body">
        {{ dataPolygon.last_warning.description }}
      </v-card-text>
    </v-card>
    <v-card-subtitle class="mt-2"
      >Температура: <span>{{ dataPolygon.humidity }}C</span></v-card-subtitle
    >
    <v-card-subtitle
      >Влажность: <span>{{ dataPolygon.temperature }}</span></v-card-subtitle
    >
    <v-card-subtitle
      >Стадия:
      <span v-if="dataPolygon.stage == 0">Распускание почек</span>
      <span v-else-if="dataPolygon.stage == 1">Начало цветения</span>
      <span v-else-if="dataPolygon.stage == 2">Цветение</span>
      <span v-else-if="dataPolygon.stage == 3">Ягодное развитие</span>
      <span v-else-if="dataPolygon.stage == 4">Завязывание плодов</span>
      <span v-else-if="dataPolygon.stage == 5">Период покоя</span>
      <span v-else>Урожай</span>
    </v-card-subtitle>

    <v-card-subtitle class="d-flex align-center"
      >Агроном:
      <span class="d-flex align-center ml-2">
        <v-img
          max-width="27"
          cover
          height="27"
          class="rounded-circle mr-1"
          :src="
            dataPolygon.user.avatar ??
            'https://wheretoeat.ru/upload/medialibrary/d4a/d4a1af572de90e43aa5e0ad8d4efdebb.jpg'
          "
        >
        </v-img>
        {{
          (dataPolygon.user.first_name ?? "") +
          " " +
          (dataPolygon.user.last_name ?? "")
        }}
      </span></v-card-subtitle
    >
    <v-card elevation="0" class="d-flex justify-space-between mt-4">
      <v-btn
        variant="outlined"
        color="primary"
        :to="`/tasks/task/${dataPolygon.id}`"
        class="text-none"
        >Подробнее</v-btn
      >
      <v-btn color="primary" :to="'/tasks'" class="text-none"
        >Создать задачу</v-btn
      >
    </v-card>
  </v-card>
</template>

<script>
import { watch, ref } from "vue";
export default {
  props: {
    propsData: Object(),
  },
  setup(props, { emit }) {
    const closeDialog = () => {
      emit("close");
    };
    const dataPolygon = ref(null);
    watch(() => {
      dataPolygon.value = props.propsData;
      console.log(dataPolygon.value);
    });
    return {
      dataPolygon,
      closeDialog,
    };
  },
};
</script>