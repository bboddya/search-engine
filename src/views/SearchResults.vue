<template>
  <div class="uk-container">
    <router-link to="/" class="uk-align-center uk-text-center uk-margin-large-top">
      <img src="@/assets/imgs/icon.png" alt="Logo" />
    </router-link>

    <div v-if="getResult.length">
      <h3 class="uk-text-center">Результаты поиска по {{ changeText }}: {{ queryObj.input }}</h3>

      <User v-for="user in getResult" :key="user.id" :user="user" />
    </div>

    <div class="uk-text-center" v-else>
      <span class="uk-icon uk-margin-bottom" uk-icon="icon: user; ratio: 3"></span>

      <h3 class="uk-text-danger">
        Результаты по {{ changeText }}: "{{ queryObj.input }}" не найдены
      </h3>
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
    queryObj: {}
  }),
  created() {
    this.queryObj = {
      keyName: this.$route.query.keyName,
      query: this.$route.query.query,
      input: this.$route.query.input
    };

    this.$store.dispatch('search', this.queryObj);
  },
  computed: {
    ...mapGetters(['getResult']),
    changeText() {
      const { keyName } = this.queryObj;
      if (keyName === 'phone') return 'телефону';
      if (keyName === 'nickName') return 'псевдониму';
      if (keyName === 'name') return 'имени и фамилии';
      return keyName;
    }
  }
};
</script>
