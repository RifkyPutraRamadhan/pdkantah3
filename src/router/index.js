import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/supabase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("@/views/Loginview.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/Dashboardview.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/peminjamanberkas",
      name: "peminjamanberkas",
      component: () => import("@/views/PeminjamanBerkasview.vue"),
      meta: { requiresAuth: true },
    },
   {
      path: "/entridatapeminjaman",
      name: "entridatapeminjaman",
      component: () => import("@/views/EntriDataPeminjamanview.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/berkastidakditemukan",
      name: "berkastidakditemukan",
      component: () => import("@/views/BerkasTidakDitemukanview.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/entridatatidakditemukan",
      name: "entridatatidakditemukan",
      component: () => import("@/views/EntriDataTidakDitemukanview.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/pengembalianberkas",
      name: "pengembalianberkas",
      component: () => import("@/views/PengembalianBerkasview.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/entridatapengembalian",
      name: "entridatapengembalian",
      component: () => import("@/views/EntriDataPengembalianview.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/registrasi",
      name: "registrasi",
      component: () => import("@/views/Registrasi.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();

  if (to.meta.requiresAuth && !user) {
    next("/");
  } else {
    next();
  }
});

export default router;