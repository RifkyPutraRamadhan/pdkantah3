<template>
  <h1 align="center" class="mb-4">Selamat Datang di Pengolahan Data Kantor Tanah</h1>
   <div class="container mb-3">
  <div class="card" style="width: 18rem;">
  <img src="../../assets/peminjaman_berkas.jpeg" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">Peminjaman Berkas</h5>
  <p class="card-text">Entri data disini, Jika anda sudah mendapatkan pencarian suatu berkas yang akan dipinjamkan.</p>
    <router-link to="/peminjamanberkas" class="btn btn-primary">Buka Sekarang</router-link>
  </div>
  </div>
  <div class="card" style="width: 18rem;">
  <img src="../../assets/pengembalian_berkas.jpeg" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">Pengembalian Berkas</h5>
  <p class="card-text">Entri data disini, Jika anda sudah meminjam suatu berkas dari pengolahan data tersebut.</p>
    <router-link to="/pengembalianberkas" class="btn btn-primary">Buka Sekarang</router-link>
  </div>
  </div>
  <div class="card" style="width: 18rem;">
  <img src="../../assets/berkas_tidak_ditemukan.jpeg" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">Berkas Tidak Ditemukan</h5>
  <p class="card-text">Entri data disini, Jika anda kehilangan atau tidak menemukan suatu berkas yang akan dicari.</p>
    <router-link to="/berkastidakditemukan" class="btn btn-primary">Buka Sekarang</router-link>
</div>
</div>
</div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  margin: 12px;
}

.card-img-top {
  object-fit: cover;
  height: 200px;
  width: 100%;
}
</style>