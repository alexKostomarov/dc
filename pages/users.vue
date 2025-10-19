<template>
  <v-container>
    <div v-if="users.length !== 0 && hydrated">
      <v-row justify="space-between" align="center">
        <FilterBar />
      </v-row>

      <v-data-table
          :itemKey="'id'"
          :headers="headers"
          :items="users"
          :items-per-page="users.length"
          hide-default-footer
          v-if="!isMobile"
      >
        <template v-slot:item.city="{ item }">
          <div class="cursor-pointer" @click="applyCityFilter(item.city.id)">{{ item.city.title }}</div>
        </template>

        <template v-slot:item.updatedAt="{ item }">
          {{ formatDate(item.updatedAt) }}
        </template>


      </v-data-table>
      <div v-else>
        <v-container fluid>
          <v-row dense>
            <v-col
                v-for="item in users"
                :key="item.id"
                cols="12"
            >
              <v-card outlined>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-text>
                  <v-col cols="6">
                    <div><strong>Телефон:</strong> {{ item.phone }}</div>
                    <div><strong>Баланс:</strong> {{ item.balance }}</div>
                    <div><strong>Кэшбэк %:</strong> {{ item.cashbackPercent }}</div>
                    <div><strong>Дата:</strong> {{ formatDate(item.updatedAt) }}</div>
                  </v-col>
                  <v-col cols="6">
                    <div><strong>Город:</strong> {{ item.city.title }}</div>
                    <div><strong>Сохранено:</strong> {{ item.saveTotal }}</div>
                    <div><strong>Потрачено:</strong> {{ item.spendTotal }}</div>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-row justify="center" class="mt-4">
        <Pagination />
      </v-row>
    </div>

    <v-skeleton-loader v-else type="table" />


  </v-container>
</template>

<script>
import {total, firstBatch, batchSize} from '~/config/settings';
import Pagination from "../components/Pagination.vue";
import cities from "~/assets/data/cities.json";
import FilterBar from "../components/users/FilterBar.vue";

export default {
  components: {FilterBar, Pagination},
  data() {
    return {
      headers: [
        { text: 'Имя', value: 'name' },
        { text: 'Телефон', value: 'phone' },
        { text: 'Баланс', value: 'balance' },
        { text: 'Кэшбэк %', value: 'cashbackPercent' },
        { text: 'Город', value: 'city' },
        { text: 'Сохранено', value: 'saveTotal' },
        { text: 'Потрачено', value: 'spendTotal' },
        { text: 'Дата', value: 'updatedAt' },
      ],
      hydrated: false//используем для скрытия до завршения гидратации
    };
  },
  computed: {
    users() {
      return this.$store.getters['users/users'];
    },
    loading() {
      return this.$store.state.users.loading;
    },
    isMobile(){
      return this.$store.getters['screen/isMobile'];
    },
  },
  async fetch() {//первые 100 записей получаем на сервере - SEO
    await this.$store.dispatch('users/loadUsers', {
      offset: this.offset,
      limit: firstBatch
    });
  },
  mounted() {//остальные в клиенте
    this.hydrated = true;
    this.loadUsers();
  },
  methods: {
    async loadUsers() {

      let offset = firstBatch;

      while (offset < total) {

        const limit = Math.min(batchSize, total - offset);//размер последнего чанка меньше чем 500

        await this.$store.dispatch('users/loadUsers', {
          offset: offset,
          limit: limit
        });
        offset += limit;
      }
    },
    formatDate(ts) {
      const d = new Date(ts)
      const dd = ('0' + d.getDate()).slice(-2)
      const mm = ('0' + (d.getMonth() + 1)).slice(-2)
      const yyyy = d.getFullYear()
      return `${dd}-${mm}-${yyyy}`
    },
    applyCityFilter(val) {
      this.$store.commit('users/appendCityId', val);
    }
  }
};
</script>

<style scoped>
.cursor-pointer {cursor: pointer!important;}
</style>
