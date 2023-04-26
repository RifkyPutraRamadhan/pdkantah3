<template>
  <div class="container">
    <div class="row flex-lg-nowrap">
      <div class="col">
        <div class="row">
          <div class="col mb-3">
            <div class="card">
              <div class="card-body">
                <h1 align="center">Entri Data Berkas Tidak Ditemukan</h1>
                <form @submit.prevent="addBerkas">
                  <div class="mb-3">
                    <label for="jenis_berkas" class="form-label">Jenis Berkas</label>
                    <input v-model="berkas.jenis_berkas" type="text" class="form-control" id="jenis_berkas" aria-describedby="jenis_berkas" required>
                  </div>
                  <div class="mb-3">
                    <label for="indeks" class="form-label">Indeks</label>
                    <input v-model="berkas.indeks" type="text" class="form-control" id="indeks" required>
                  </div>
                  <div class="mb-3">
                    <label for="tanggal_pinjam" class="form-label">Tanggal Pinjam</label>
                    <input v-model="berkas.tanggal_pinjam" type="datetime-local" class="form-control" id="tanggal_pinjam" required>
                  </div>
                  <div class="mb-3">
                    <label for="keterangan" class="form-label">Keterangan</label>
                    <textarea v-model="berkas.keterangan" class="form-control" id="keterangan" required></textarea>
                  </div>
                  <div class="row">
                    <div class="col d-flex justify-content-end">
                      <router-link to="/berkastidakditemukan" name="kembali" class="btn btn-danger mb-3 me-2">KEMBALI</router-link>
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
import { createClient } from '@supabase/supabase-js';

export default {
  name: 'EntriBerkasTidakDitemukan',
  data() {
    return {
      berkas: {
        jenis_berkas: '',
        indeks: '',
        tanggal_pinjam: '',
        keterangan: ''
      }
    }
  },
  methods: {
    async addBerkas() {
      const supabase = createClient('https://brzuijcchftuhjriylqf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyenVpamNjaGZ0dWhqcml5bHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIyNTY4MDMsImV4cCI6MTk3NzgzMjgwM30.0JpDOQAEXyYf53YtDgcGRnQmOkqVAZTd-IG_LPg1blo');
      const { data, error } = await supabase.from('berkas_tidak_ditemukan').insert([this.berkas]);
      if (error) {
        console.error(error);
      } else {
        this.$router.push('/berkastidakditemukan');
      }
    }
  }
}
</script>