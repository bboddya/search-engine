<template>
  <div class="uk-container">
    <router-link to="/" class="uk-align-center uk-text-center uk-margin-large-top">
      <img src="@/assets/imgs/icon.png" alt="Logo" />
    </router-link>

    <div v-if="getResult.length">
      <h3 class="uk-text-center">Результаты поиска по запросу: {{ input }}</h3>

      <User v-for="user in getResult" :key="user.id" :user="user" />
    </div>

    <div class="uk-text-center" v-else>
      <span class="uk-icon uk-margin-bottom" uk-icon="icon: user; ratio: 3"></span>

      <h3 class="uk-text-danger">Результаты по запросу: "{{ input }}" не найдены</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import User from '@/components/User.vue';

export default {
  components: {
    User
  },
  data: () => ({
    input: ''
  }),
  async created() {
    const queryObj = {
      keyName: this.$route.query.keyName,
      query: this.$route.query.query
    };

    this.input = queryObj.query;
    queryObj.query = await this.normalizeQuery(queryObj);
    this.$store.dispatch('search', queryObj);
  },
  computed: {
    ...mapGetters(['getResult'])
  },
  methods: {
    normalizeQuery({ keyName, query }) {
      if (keyName === 'phone') {
        const formattedNumber = query.replace(/[^\d]/g, '');
        return formattedNumber;
      }

      if (keyName === 'nickName') {
        return query.includes('@') ? query.split('@').join('') : query;
      }

      if (keyName === 'name') {
        return query.toLowerCase();
      }

      return query;
    }
  }
};
</script>
