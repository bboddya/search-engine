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
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { isIPV6Address, isIPV4Address } from 'ip-address-validator';

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
          matchedQuery.query = this.normalizeQuery(matchedQuery);

          const { query, keyName } = matchedQuery;
          this.$router.push({
            name: 'SearchResults',
            query: { query, keyName, input: this.input }
          });
        } else {
          this.error = 'Не удалось определить тип запроса';
        }
      }
    },
    keyMatch(query) {
      const number = query.includes('+') ? query : '+' + query;
      const phoneNumber = parsePhoneNumberFromString(number);
      if (phoneNumber && phoneNumber.isValid()) {
        return {
          keyName: 'phone',
          query
        };
      }

      if (query.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return {
          keyName: 'email',
          query
        };
      }

      if (query.match(/^@?[a-zA-Z]*[a-zA-Z_]+\w*$/)) {
        return {
          keyName: 'nickName',
          query
        };
      }

      if (isIPV4Address(query) || isIPV6Address(query)) {
        return {
          keyName: 'ip',
          query
        };
      }

      let fullName = query.split(' ').filter((str) => str.length);

      if (query.match(/^[\p{L}\s\-]+$/u) && fullName.length === 2) {
        return {
          keyName: 'name',
          query: fullName.join(' ')
        };
      }
    },
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
