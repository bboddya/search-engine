<template>
  <div class="uk-height-viewport uk-flex uk-flex-center uk-flex-middle">
    <div class="uk-padding-small">
      <img class="uk-align-center" src="@/assets/imgs/icon.png" alt="Logo" />

      <div class="uk-inline uk-width-1-1" @keyup.enter="submit">
        <span class="uk-form-icon" uk-icon="icon: search"></span>
        <input
          class="uk-input uk-form-large uk-border-pill"
          type="text"
          v-model="input"
          placeholder="Введите ваш запрос"
        />
      </div>

      <button
        class="uk-align-center uk-button uk-button-default uk-background-muted"
        @click="submit"
      >
        Поиск
      </button>

      <div v-if="error" class="uk-text-center uk-text-danger uk-margin-top">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      error: null
    };
  },
  methods: {
    submit() {
      this.input = this.input.trim();
      if (this.input) {
        this.error = null;
        const matchedQuery = this.keyMatch(this.input);

        if (matchedQuery) {
          const { query, keyName } = matchedQuery;
          this.$router.push({ name: 'SearchResults', query: { query, keyName } });
        } else {
          this.error = 'Не удалось определить тип запроса';
        }
      }
    },
    keyMatch(query) {
      if (query.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)) {
        return {
          keyName: 'email',
          query
        };
      }

      if (query.match(/^(?:\+)?\d{1,3}[-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/)) {
        return {
          keyName: 'phone',
          query
        };
      }

      if (query.match(/^@?[\w\d_]+$/)) {
        return {
          keyName: 'nickName',
          query
        };
      }

      if (query.match(/^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/)) {
        return {
          keyName: 'name',
          query
        };
      }

      if (
        query.match(
          /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/
        )
      ) {
        return {
          keyName: 'ip',
          query
        };
      }
    }
  }
};
</script>
