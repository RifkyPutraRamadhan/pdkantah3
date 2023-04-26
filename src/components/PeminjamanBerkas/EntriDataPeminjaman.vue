<template>
  <div class="container">
    <div class="row flex-lg-nowrap">
      <div class="col">
        <div class="row">
          <div class="col mb-3">
            <div class="card">
              <div class="card-body">
                <h1 align="center">Entri Data Peminjaman Berkas</h1>
                <form @submit.prevent="addPeminjamanBerkas">
                  <div class="mb-3">
                    <label for="tanggal_pinjam" class="form-label">Tanggal Pinjam</label>
                    <input v-model="tanggal_pinjam" type="datetime-local" class="form-control" id="tanggal_pinjam" required>
                  </div>
                  <div class="mb-3">
                    <label for="l jenis_berkas" class="form-label">Jenis Berkas</label>
                    <input type="text" v-model="jenis_berkas" class="form-control" id="l jenis_berkas" required>
                  </div>
                  <div class="mb-3">
                    <label for="l indeks" class="form-label">Indeks</label>
                    <input type="text" v-model="indeks" class="form-control" id="l indeks" required>
                  </div>
                  <div class="mb-3">
                    <label for="l nama_peminjam" class="form-label">Nama Peminjam</label>
                    <input type="text" v-model="nama_peminjam" class="form-control" id="l nama_peminjam" required>
                  </div>
                  <div class="mb-3">
                    <label for="l bidang" class="form-label">Bidang</label>
                    <input type="text" v-model="bidang" class="form-control" id="l bidang" required>
                  </div>
                  <div class="mb-3">
                    <label for="l keterangan" class="form-label">Keterangan</label>
                    <textarea v-model="keterangan" class="form-control" id="l keterangan" required></textarea>
                  </div>
                  <div class="row">
                    <div class="col d-flex justify-content-end">
                      <router-link to="/peminjamanberkas" name="kembali" class="btn btn-danger mb-3 me-2">KEMBALI</router-link>
                      <button type="submit" name="submit" class="btn btn-primary mb-3">TAMBAH</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { createClient } from '@supabase/supabase-js';
import router from '@/router';

const supabaseUrl = 'https://brzuijcchftuhjriylqf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyenVpamNjaGZ0dWhqcml5bHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIyNTY4MDMsImV4cCI6MTk3NzgzMjgwM30.0JpDOQAEXyYf53YtDgcGRnQmOkqVAZTd-IG_LPg1blo';

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default {
  setup() {
    const tanggal_pinjam = ref(null);
    const jenis_berkas = ref("");
    const indeks = ref("");
    const nama_peminjam = ref("");
    const bidang = ref("");
    const keterangan = ref("");

    const addPeminjamanBerkas = async () => {
      const { data, error } = await supabaseClient
        .from("peminjaman_berkas")
        .insert([
          {
            tanggal_pinjam: tanggal_pinjam.value,
            jenis_berkas: jenis_berkas.value,
            indeks: indeks.value,
            nama_peminjam: nama_peminjam.value,
            bidang: bidang.value,
            keterangan: keterangan.value,
          },
        ]);
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        router.push("/peminjamanberkas");
      }
    };

    return {
      tanggal_pinjam,
      jenis_berkas,
      indeks,
      nama_peminjam,
      bidang,
      keterangan,
      addPeminjamanBerkas,
    };
  },
};
</script>