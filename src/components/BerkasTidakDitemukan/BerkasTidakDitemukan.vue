<template>
  <div class="container">
    <h1 align="center">Berkas Tidak Ditemukan</h1>
    <router-link to="/entridatatidakditemukan" class="btn btn-primary mb-2" role="button">
      <i class="bi bi-file-earmark-plus"></i> Entri Data
    </router-link>
    <form class="d-flex" method="post" @submit.prevent="searchData">
  <input class="form-control-search mb-2" type="search" name="keyword" v-model="searchKeyword" placeholder="Cari kata kunci.." aria-label="Search" style="width: 300px;">
  <button class="btn btn-outline-primary mb-2" type="button" @click="searchData">
    <i class="bi bi-search"></i>
  </button>
</form>
    <div class="card-body table-responsive p-0" style="height: 350px; position: relative; text-align: center;">
      <table class="table table-light">
        <thead>
          <tr class="table-secondary">
            <th scope="col">ID</th>
            <th scope="col">Jenis Berkas</th>
            <th scope="col">Indeks</th>
            <th scope="col">Tanggal Pinjam</th>
            <th scope="col">Tanggal Sekarang</th>
            <th scope="col">Keterangan</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dataList" :key="index">
            <td>{{ data.id }}</td>
            <td>{{ data.jenis_berkas }}</td>
            <td>{{ data.indeks }}</td>
            <td>{{ data.tanggal_pinjam }}</td>
            <td>{{ data.tanggal_sekarang }}</td>
            <td>{{ data.keterangan }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="editData(data)"><i class="bi bi-pencil-square"></i> Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteData(data)"><i class="bi bi-trash"></i> Hapus</button>
            </td>
          </tr>
          <tr v-if="dataList.length === 0">
            <td colspan="8" style="text-align: center;">
              <div class="alert alert-danger" role="alert">
              Data Tidak Ditemukan
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

export default {
  data() {
    return {
      dataList: [],
      supabaseUrl: 'https://brzuijcchftuhjriylqf.supabase.co',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyenVpamNjaGZ0dWhqcml5bHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIyNTY4MDMsImV4cCI6MTk3NzgzMjgwM30.0JpDOQAEXyYf53YtDgcGRnQmOkqVAZTd-IG_LPg1blo',
      selectedData: null,
      searchKeyword: '',
      modalTitle: '',
      modalMode: '',
      formData: {
        id: '',
        jenis_berkas: '',
        indeks: '',
        tanggal_pinjam: '',
        tanggal_sekarang: '',
        keterangan: '',
      },
      searchQuery: '',
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const supabase = createClient(this.supabaseUrl, this.supabaseKey);
      const { data, error } = await supabase.from('berkas_tidak_ditemukan').select('*');
      if (error) {
        console.error(error);
      } else {
        this.dataList = data;
      }
    },
    editData(data) {
      this.selectedData = data;
      this.modalTitle = "Edit Data Berkas Tidak Ditemukan";
      this.modalMode = "edit";
      this.formData = {
        id: data.id,
        jenis_berkas: data.jenis_berkas,
        indeks: data.indeks,
        tanggal_pinjam: data.tanggal_pinjam,
        tanggal_sekarang: data.tanggal_sekarang,
        keterangan: data.keterangan,
      };
      $("#modal-form").modal("show");
    },
    async deleteData(id) {
      const supabase = createClient(this.supabaseUrl, this.supabaseKey);
      const { error } = await supabase.from('berkas_tidak_ditemukan').delete().match({ id });
      if (error) {
        console.error(error);
      } else {
        this.fetchData();
      }
    },
      async searchData() {
      const supabase = createClient(this.supabaseUrl, this.supabaseKey);
      const { data, error } = await supabase
        .from("berkas_tidak_ditemukan")
        .select("*")
        .ilike("jenis_berkas", `%${this.searchKeyword}%`);
      if (error) {
        console.error(error);
      } else {
        this.dataList = data;
      }
    },
  },
};
</script>