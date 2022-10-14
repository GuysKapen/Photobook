import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SignUpView from "@/views/SignUpView.vue";
import LoginView from "@/views/LoginView.vue";
import AlbumsView from "@/views/AlbumsView.vue";
import AlbumDetailPage from "@/views/AlbumDetailPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/albums/:id",
      name: "album-detail",
      component: AlbumDetailPage,
    },
    {
      path: "/albums",
      name: "albums",
      component: AlbumsView,
    },
  ],
});

export default router;
