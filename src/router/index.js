import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Login",
        redirect: { name: "profile" }
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("../views/Profile/Profile.vue"),
    },
    {
        path: "/projects",
        name: "projects",
        component: () => import("../views/Projects/Projects.vue"),
    },
    {
        path: "/tasks",
        name: "tasks",
        component: () => import("../views/Tasks/Tasks.vue"),
    },
    {
        path: "/tasks/task/:id",
        name: "task",
        component: () => import("../views/Tasks/TaskSelect.vue")
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/Dashboard/Dashboard.vue")
    },
    {
        path: "/messages",
        name: "messages",
        component: () => import("../views/Messages/Messages.vue")
    },
    {
        path: "/archive",
        name: "archive",
        component: () => import("../views/Archive/Archive.vue")
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
