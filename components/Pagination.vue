<template>
  <div class="pagination">
    <v-btn icon @click="prev" :disabled="page === 1">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-btn
        v-for="(item, index) in pages"
        :key="item === '...' ? `ellipsis-${index}` : `page-${item}`"
        :color="item === page ? 'orange' : 'default'"
        @click="select(item)"
        :disabled="item === '...'"
    >
      {{ item }}
    </v-btn>

    <v-btn icon @click="next" :disabled="page === total">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>

  </div>

</template>

<script>
import { pageRadius} from "../config/settings";

export default {
  computed: {
    page() {//текущая страница
      return this.$store.getters['users/page']
    },
    total() {//всего страниц
      return this.$store.getters['users/pageCount'];
    },
    radius() {//количество отображаемых страниц вокруг текущей
      return this.$vuetify.breakpoint.smAndDown ? 1 : pageRadius
    },
    pages() {// массив номеров страниц
      const pages = [];

      // Количество страниц слева от текущей — радиус, но не меньше 2 (чтобы не затереть первую страницу)
      const left = Math.max(2, this.page - this.radius);

      // Количество страниц справа от текущей — радиус, но не больше total - 1 (чтобы не затереть последнюю страницу)
      const right = Math.min(this.total - 1, this.page + this.radius);


      pages.push(1); // первая страница видна всегда

      //если между первой страницей (1) и началом центрального диапазона (left)
      // есть разрыв больше чем одна страница, то вставляем элипсис
      if (left > 2) {
        pages.push('...')
      }

      //центральная часть
      for (let i = left; i < right + 1; i++) {
        pages.push(i)
      }

      // Если между последней страницей и правой границей диапазона есть разрыв — вставляем многоточие
      if (right < this.total - 1) {
        pages.push('...')
      }

      // Всегда показываем последнюю страницу, если их больше чем одна
      if (this.total > 1) {
        pages.push(this.total)
      }

      return pages
    }
  },
  methods: {
    select(p) {
      console.log(p)
      if (typeof p === 'number') {
        this.$store.commit('users/setPage', p)
      }
    },
    prev() {
      if (this.page > 1) this.select(this.page - 1)
    },
    next() {
      if (this.page < this.total) this.select(this.page + 1)
    }
  }
}
</script>
