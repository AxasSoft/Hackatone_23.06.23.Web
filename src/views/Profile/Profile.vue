<template>
  <v-card>
    <v-card class="d-flex pa-2" elevation="0">
      <v-card elevation="0" class="d-flex w-100">
        <v-img
          max-width="147"
          cover
          class="rounded-circle"
          height="147"
          :src="`${
            accountData.avatar ??
            'https://get.pxhere.com/photo/person-people-portrait-facial-expression-hairstyle-smile-emotion-portrait-photography-134689.jpg'
          }`"
        ></v-img>
        <v-card elevation="0">
          <v-card-title
            >{{
              (accountData.first_name ?? "") +
              " " +
              (accountData.last_name ?? "")
            }}
          </v-card-title>
          <v-card elevation="0" class="d-flex">
            <v-card-subtitle class="d-flex align-center">
              <v-icon icon="mdi-account-outline"></v-icon>
              <span class="ml-2">{{
                accountData.is_superuser ? "Администратор" : "Менеджер"
              }}</span>
            </v-card-subtitle>
            <v-card-subtitle class="d-flex align-center">
              <v-icon icon="mdi-email-outline"></v-icon>
              <span class="ml-2">{{ accountData.email }}</span>
            </v-card-subtitle>
          </v-card>
          <v-btn
            color="primary"
            variant="outlined"
            class="text-none text-subtitle-2 ml-4 mt-10"
            density="compact"
            >Редактировать профиль</v-btn
          >
        </v-card>
      </v-card>
      <v-card elevation="0">
        <v-btn color="primary" class="text-none" width="240px" :to="'/tasks'"
          >Создать задачу</v-btn
        >
      </v-card>
    </v-card>
    <v-card elevation="0" class="pa-2">
      <v-tabs
        v-model="tab"
        bg-color="none"
        color="primary"
        slider-color="primary"
      >
        <v-tab class="text-none" :value="1">Мои задачи</v-tab>
        <v-tab class="text-none" :value="2">Сроки</v-tab>
        <v-tab class="text-none" :value="3">Пользователи</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item :value="1"> One </v-window-item>

          <v-window-item :value="2"> Two </v-window-item>

          <v-window-item :value="3">
            <v-table>
              <thead>
                <tr>
                  <th class="text-left text-primary">Имя</th>
                  <th class="text-left text-primary">Назначение</th>
                  <th class="text-left text-primary">Дата создания</th>
                  <th class="text-left text-primary">Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in usersData">
                  <td>
                    {{ (data.first_name ?? "") + " " + (data.last_name ?? "") }}
                  </td>
                  <td>
                    <v-btn
                      color="primary"
                      class="text-none rounded-xl text-subtitle-2"
                      elevation="0"
                      >Администратор</v-btn
                    >
                  </td>
                  <td>17.05.2023, 14:40:17</td>
                  <td>
                    <v-btn
                      density="compact"
                      icon="mdi mdi-tune-variant"
                      elevation="0"
                      size="small"
                    ></v-btn>
                    <v-btn
                      density="compact"
                      icon="mdi-delete-outline"
                      elevation="0"
                      size="small"
                      class="ml-6"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-card>
</template>


<script>
import { account } from "@/compositions/account.js";
import { users } from "@/compositions/users.js";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const { getAccount } = account();
    const { getUsers } = users();
    const tab = ref(3);

    const accountData = ref({
      avatar: null,
      first_name: null,
      last_name: null,
      is_superuser: null,
      email: null,
    });

    const usersData = ref([]);

    onMounted(() => {
      getAccount().then((r) => {
        accountData.value = r.data.data;
      });
      getUsers().then((r) => {
        usersData.value = r.data.data;
      });
    });
    return {
      tab,
      accountData,
      usersData,
    };
  },
};
</script>