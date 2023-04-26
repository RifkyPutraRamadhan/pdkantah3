<template>
  <div class="container">
    <h1 align="center">Pengembalian Berkas</h1>
    <router-link to="/entridatapengembalian" class="btn btn-primary mb-2" role="button">
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
            <th scope="col">Tanggal Kembali</th>
            <th scope="col">Jenis Berkas</th>
            <th scope="col">Indeks</th>
            <th scope="col">Nama Peminjam</th>
            <th scope="col">Bidang</th>
            <th scope="col">Keterangan</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dataList" :key="index">
            <td>{{ data.id }}</td>
            <td>{{ data.tanggal_kembali }}</td>
            <td>{{ data.jenis_berkas }}</td>
            <td>{{ data.indeks }}</td>
            <td>{{ data.nama_peminjam }}</td>
            <td>{{ data.bidang }}</td>
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
        tanggal_kembali: '',
        jenis_berkas: '',
        indeks: '',
        nama_peminjam: '',
        bidang: '',
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
      const { data, error } = await supabase.from('pengembalian_berkas').select('*');
      if (error) {
        console.error(error);
      } else {
        this.dataList = data;
      }
    },
    editData(data) {
      this.selectedData = data;
      this.modalTitle = "Edit Data Pengembalian Berkas";
      this.modalMode = "edit";
      this.formData = {
        id: data.id,
        tanggal_kembali: data.tanggal_kembali,
        jenis_berkas: data.jenis_berkas,
        indeks: data.indeks,
        nama_peminjam: data.nama_peminjam,
        bidang: data.bidang,
        keterangan: data.keterangan,
      };
      $("#modal-form").modal("show");
    },
    async deleteData(id) {
      const supabase = createClient(this.supabaseUrl, this.supabaseKey);
      const { error } = await supabase.from('pengembalian_berkas').delete().match({ id });
      if (error) {
        console.error(error);
      } else {
        this.fetchData();
      }
    },
      async searchData() {
      const supabase = createClient(this.supabaseUrl, this.supabaseKey);
      const { data, error } = await supabase
        .from("pengembalian_berkas")
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