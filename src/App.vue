<template>
  <v-app>
    <v-main>
      <v-app-bar elevation="0" color="background">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="rail = !rail"></v-app-bar-nav-icon>
          <img src="@/assets/logo.svg" class="ml-2" alt="" />
        </template>
      </v-app-bar>
      <v-card class="h-100">
        <v-layout class="h-100">
          <v-navigation-drawer
            :rail="rail"
            elevation="0"
            border="none"
            color="background"
          >
            <v-list density="compact" nav>
              <v-list-item
                :to="'/profile'"
                color="primary"
                class="rounded-xl"
                prepend-icon=" mdi-account-outline"
                title="Администратор"
                value="myfiles"
              ></v-list-item>
              <v-list-item
                :to="'/projects'"
                color="primary"
                class="rounded-xl"
                prepend-icon="mdi-map-outline"
                title="Карта"
                value="shared"
              ></v-list-item>
              <v-list-item
                :to="'/tasks'"
                color="primary"
                class="rounded-xl"
                prepend-icon="mdi-format-list-bulleted"
                title="Список задач"
              ></v-list-item>
              <v-list-item
                :to="'/dashboard'"
                color="primary"
                class="rounded-xl"
                prepend-icon="mdi-view-dashboard-outline"
                title="Аналитика"
              ></v-list-item>
              <v-list-item
                :to="'/messages'"
                color="primary"
                class="rounded-xl"
                prepend-icon="mdi-message-text-outline"
                title="Чат"
              ></v-list-item>
              <v-list-item
                :to="'/archive'"
                color="primary"
                class="rounded-xl"
                prepend-icon="mdi-archive-outline"
                title="Архив"
              ></v-list-item>
            </v-list>
          </v-navigation-drawer>

          <v-main class="bg-background pb-4 pr-4">
            <router-view
              class="h-100 pa-2"
              style="overflow-y: auto"
            ></router-view>
          </v-main>
        </v-layout>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
const rail = ref(true);
onMounted(() => {
  localStorage.setItem(
    "Token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwic2Vzc2lvbl9pZCI6NjUsImlhdCI6MTY4NzYxMDQzOSwibmJmIjoxNjg3NjEwNDM5LCJqdGkiOiIzMGFjZDY5NS1lMGVhLTQ0ODYtOTNkMC0xODgxNTM4ZWQ5M2EiLCJ0eXBlIjoiYWNjZXNzIn0.-PQsTvgCtvi3pSs7vCEOEYFf-TFrrrdjboIo3175AzA"
  );
});
</script>

<style>
.w-60 {
  width: 60%;
}
.w-40 {
  width: 40%;
}
.hover {
  transition: 0.3s;
}
.hover:hover {
  cursor: pointer;
  background: #0008a527;
}
</style>
