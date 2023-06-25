<template>
  <v-card class="d-flex align-start flex-column">
    <v-card
      class="d-flex justify-space-between align-center w-100"
      elevation="0"
    >
      <v-card elevation="0" class="d-flex align-center w-50 pa-2">
        <v-img
          max-width="37"
          cover
          height="37"
          class="rounded-circle mr-1"
          src="https://get.pxhere.com/photo/person-people-portrait-facial-expression-hairstyle-smile-emotion-portrait-photography-134689.jpg"
        ></v-img>
        <v-img
          max-width="37"
          cover
          height="37"
          class="rounded-circle mr-1"
          src="https://news.store.rambler.ru/img/b5347c4e353ea3f9399c9942d66a85f4?img-format=auto&img-1-resize=height:710"
        ></v-img>
        <v-img
          max-width="37"
          cover
          height="37"
          class="rounded-circle mr-1"
          src="http://img-fotki.yandex.ru/get/4903/42418819.a70/0_9ef91_4d14441_XXXL.jpg"
        ></v-img>
        <v-img
          max-width="37"
          cover
          height="37"
          class="rounded-circle mr-1"
          src="https://sun9-40.userapi.com/impf/c637325/v637325748/165da/cBg76o2dwio.jpg?size=1280x853&quality=96&sign=9d179fd630d23e3618d7d9e32afe19df&c_uniq_tag=-F2NBKzo86yzSaiccY1enWO2EPCt2bmWUQcUSNZYa-w&type=album"
        ></v-img>
        <v-btn
          icon="mdi-plus"
          size="small"
          elevation="0"
          style="box-shadow: 0px 0px 2px 0px !important"
        ></v-btn>
      </v-card>
      <v-card elevation="0" class="d-flex align-center w-50 mr-4">
        <v-card-text>
          <v-text-field
            density="compact"
            bg-color="background"
            variant="solo"
            label="Поиск"
            append-inner-icon="mdi-magnify"
            hide-details
            color="primary"
            class="mr-2"
            flat
          ></v-text-field>
        </v-card-text>
        <!-- <v-btn color="primary" width="240px" :to="'/tasks'"
          >Создать задачу</v-btn
        > -->
        <v-btn color="primary" @click="openDialog(null)">Создать задачу</v-btn>
        <v-dialog
          transition="dialog-top-transition"
          width="auto"
          v-model="isActive"
        >
          <TaskDialog
            @update="updateData"
            @close="closeDialog"
            :dataTask="selectTask"
          />
        </v-dialog>
      </v-card>
    </v-card>
    <v-card class="w-100" elevation="0">
      <v-table>
        <thead>
          <tr>
            <th class="text-left text-primary">Название</th>
            <th class="text-left text-primary">Статус</th>
            <th class="text-left text-primary">Дата создания</th>
            <th class="text-left text-primary">Крайний срок</th>
            <th class="text-left text-primary">Постановщик</th>
            <th class="text-left text-primary">Ответсвенный</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="data in tasksData"
            :key="data.id"
            class="hover"
            @click="openDialog(data)"
          >
            <td>{{ data.title }}</td>
            <td>
              <v-btn
                color="primary"
                class="text-none rounded-xl text-subtitle-2"
                elevation="0"
                v-if="data.status == 0"
                >Создано</v-btn
              >
              <v-btn
                color="red"
                class="text-none rounded-xl text-subtitle-2"
                elevation="0"
                v-if="data.status == 1"
                >Отклонёно</v-btn
              >
              <v-btn
                color="orange"
                class="text-none rounded-xl text-subtitle-2"
                elevation="0"
                v-if="data.status == 2"
                >Выполняется специалистом</v-btn
              >
              <v-btn
                color="green"
                class="text-none rounded-xl text-subtitle-2"
                elevation="0"
                v-if="data.status == 3"
                >Выполнено</v-btn
              >
              <v-btn
                color="purple"
                class="text-none rounded-xl text-subtitle-2"
                elevation="0"
                v-if="data.status == 4"
                >Переназначено</v-btn
              >
            </td>
            <td>{{ new Date(data.created * 1000).toLocaleDateString() }}</td>
            <td v-if="data.ended">
              {{ new Date(data.deadline * 1000).toLocaleDateString() }}
            </td>
            <td v-else>Без срока</td>
            <td>
              <div class="d-flex align-center">
                <v-img
                  max-width="27"
                  cover
                  height="27"
                  class="rounded-circle mr-1"
                  :src="
                    data.avatar ??
                    'https://get.pxhere.com/photo/person-people-portrait-facial-expression-hairstyle-smile-emotion-portrait-photography-134689.jpg'
                  "
                >
                </v-img>
                <span>{{
                  (data.creator.first_name ?? " ") +
                  (data.creator.last_name ?? "")
                }}</span>
              </div>
            </td>
            <td>
              {{ data.group?.name }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-card>
</template>

<script>
import TaskDialog from "@/components/TaskDialog.vue";
import { tasks } from "@/compositions/tasks.js";
import { onMounted, ref } from "vue";
export default {
  components: {
    TaskDialog,
  },
  setup(props, { emit }) {
    const { getTasks } = tasks();

    const tasksData = ref([]);

    const updateData = () => {
      getTasks().then((r) => {
        tasksData.value = r.data.data;
      });
    };
    const isActive = ref(false);

    const closeDialog = () => {
      isActive.value = false;
    };
    onMounted(() => {
      updateData();
    });

    const selectTask = ref(null);
    const openDialog = (data) => {
      selectTask.value = data;
      isActive.value = true;
    };
    return {
      tasksData,
      updateData,
      closeDialog,
      isActive,
      openDialog,
      selectTask,
    };
  },
};
</script>