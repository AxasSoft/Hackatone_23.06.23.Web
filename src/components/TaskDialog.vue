<template>
  <v-card class="d-flex">
    <v-card class="d-flex">
      <v-card width="540" elevation="0">
        <v-toolbar color="white" title="Новая задача"></v-toolbar>
        <v-card-text>
          <label>Название задачи</label>
          <v-text-field
            variant="solo"
            flat
            bg-color="background"
            density="compact"
            v-model="task.title"
            hide-details
          ></v-text-field>

          <div class="mt-2">Описание задания</div>
          <v-textarea
            rows="1"
            auto-grow="true"
            variant="solo"
            flat
            bg-color="background"
            density="compact"
            v-model="task.description"
            hide-details
          ></v-textarea>

          <div class="mt-2">Точка</div>
          <v-select
            variant="solo"
            flat
            :items="locationsData"
            item-value="id"
            item-title="name"
            bg-color="background"
            density="compact"
            v-model="task.location_id"
            hide-details
          ></v-select>

          <div class="mt-2">Описание точки</div>
          <v-textarea
            rows="1"
            auto-grow="true"
            variant="solo"
            flat
            bg-color="background"
            density="compact"
            v-model="task.location_description"
            hide-details
          ></v-textarea>
          <div class="mt-2">Крайний срок</div>
          <VueDatePicker v-model="date"></VueDatePicker>
          <v-card elevation="0" class="d-flex justify-space-between w-100">
            <v-sheet class="w-100">
              <div class="mt-2">Статус</div>
              <v-select
                :items="statuses"
                item-title="name"
                item-value="id"
                variant="solo"
                flat
                v-model="task.status"
                bg-color="background"
                density="compact"
                hide-details
              ></v-select>
            </v-sheet>
          </v-card>
          <div class="mt-2">Ответсвенный</div>
          <v-select
            :items="groupsData"
            item-title="name"
            item-value="id"
            variant="solo"
            v-model="task.group_id"
            flat
            bg-color="background"
            density="compact"
            hide-details
          ></v-select>
        </v-card-text>
        <v-card-text class="pt-0">
          <v-checkbox
            density="compact"
            color="primary"
            label="Срочная задача"
            v-model="task.is_urgent"
            hide-details
          ></v-checkbox>
        </v-card-text>
        <v-card elevation="0" class="pa-6 pt-0">
          <v-btn color="primary" class="text-none" @click="createData()"
            >Поставить задачу</v-btn
          >
        </v-card>
      </v-card>
      <v-card width="440" elevation="0" v-if="task.report">
        <v-toolbar color="white" title="Отчет по задаче"></v-toolbar>
        <v-card-text
          >Дата подачи:
          {{
            new Date(task.report.created * 1000).toLocaleDateString()
          }}</v-card-text
        >
        <v-card-text class="pt-0"
          >Комментарий: {{ task.report.comment }}</v-card-text
        >
        <v-card-text class="pt-0"
          >Выполнил:
          {{
            (task.report.creator.first_name ?? "") +
            " " +
            (task.report.creator.last_name ?? "")
          }}</v-card-text
        >

        <v-card class="pa-4" elevation="0">
          <v-window v-model="window" show-arrows>
            <v-window-item v-for="n in task.report.photos" :key="n">
              <v-card height="200px" class="d-flex justify-center align-center">
                <v-img :src="n.url" cover></v-img>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { tasks } from "@/compositions/tasks.js";
import { groups } from "@/compositions/groups.js";
import { locations } from "@/compositions/locations.js";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  components: { VueDatePicker },
  props: {
    dataTask: Object(),
  },
  setup(props, { emit }) {
    const { createTask, changeTask } = tasks();
    const { getGroups } = groups();
    const { getLocations } = locations();

    const groupsData = ref([]);
    const locationsData = ref([]);

    onMounted(() => {
      getLocations().then((r) => {
        locationsData.value = r.data.data;
      });
      getGroups().then((r) => {
        groupsData.value = r.data.data;
      });
    });

    const statuses = ref([
      { id: 0, name: "Создано" },
      { id: 1, name: "Отклонёно" },
      { id: 2, name: "Выполняется специалистом" },
      { id: 3, name: "Выполнено" },
      { id: 4, name: "Переназначено" },
    ]);

    const window = ref(0);

    const date = ref(null);

    const task = ref({
      location_id: null,
      group_id: null,
      deadline: null,
      status: 0,
      title: null,
      location_description: null,
      description: null,
      is_urgent: null,
    });

    const createData = () => {
      task.value.deadline = date.value / 1000;
      if (!props.dataTask) {
        createTask(task.value).then(() => {
          emit("update");
          emit("close");
        });
      } else {
        changeTask(
          {
            location_id: task.value.location_id,
            group_id: task.value.group_id,
            deadline: task.value.deadline,
            status: task.value.status,
            title: task.value.title,
            location_description: task.value.location_description,
            description: task.value.description,
            is_urgent: task.value.is_urgent,
          },
          task.value.id
        ).then(() => {
          emit("update");
          emit("close");
        });
      }
    };

    watch(() => {
      if (props.dataTask) {
        task.value = { ...props.dataTask };
        task.value.location_id = task.value.location.id;
        task.value.group_id = task.value.group.id;
      } else {
        task.value = {
          location_id: 1,
          group_id: 1,
          deadline: null,
          status: 0,
          title: null,
          location_description: null,
          description: null,
          is_urgent: null,
        };
      }
    });

    return {
      groupsData,
      locationsData,
      statuses,
      task,
      createData,
      window,
      date,
    };
  },
};
</script>