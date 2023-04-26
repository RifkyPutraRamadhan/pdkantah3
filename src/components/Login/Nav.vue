<template>
  <div class="mb-3">
    <nav class="navbar navbar-expand-lg navbar-light nav-color">
      <div class="container container-fluid">
        <a :class="{'disabled-link': !isAuthenticated}" class="navbar-brand text-white" :href="isAuthenticated ? '/dashboard' : '/'" >
        </a>
        <strong class="text-white">PD KANTAH</strong>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link text-white" aria-current="page" href="/dashboard"><i class="bi bi-house-door-fill"></i> Beranda</a>
            </li>
            <li class="nav-item">
              <a v-if="isAuthenticated" href class="nav-link active text-danger" aria-current="page" @click="logout"><i class="bi bi-box-arrow-left"></i> Keluar</a>
              <a v-else class="nav-link active text-white" aria-current="page" @click="login" href = "/dashboard"><i class="bi bi-box-arrow-in-right"></i> Masuk</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from "../../supabase";

const isAuthenticated = supabase.auth.session() !== null;
const error = ref(null)

const login = async () => {
  const { error: authError } = await supabase.auth.signIn({
    email: "example@mail.com",
    password: "password",
  });
  if (authError) {
    error.value = authError.message
  } else {
    window.location.href = "/dashboard";
    window.location.reload();
  }
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  window.location.href = "/";
  window.location.reload();
};
</script>

<style>
.navbar-brand {
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/5/51/Logo_BPN-KemenATR_%282017%29.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 35px;
  height: 35px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>