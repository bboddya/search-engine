import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchResult: [],
    users: [
      {
        id: 1,
        email: 'ivan.ivanov@example.com',
        phone: '79991234567',
        nickName: 'ivanov_ivan',
        name: 'Иван Иванов',
        ip: '84.237.21.105'
      },
      {
        id: 2,
        email: 'maria.sergeeva@example.com',
        phone: '74959876543',
        nickName: 'mariasergeeva',
        name: 'Мария Сергеева',
        ip: '2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d'
      },
      {
        id: 3,
        email: 'chloe.martin@example.com',
        phone: '33123456789',
        nickName: 'chloemartin',
        name: 'Chloe Martin',
        ip: '82.146.63.34'
      },
      {
        id: 4,
        email: 'petr.petrov@example.com',
        phone: '78121234567',
        nickName: 'petrpetrov',
        name: 'Петр Петров',
        ip: '91.198.174.192'
      },
      {
        id: 5,
        email: 'juan.perez@example.com',
        phone: '34612345678',
        nickName: 'juanperez',
        name: 'Juan Perez',
        ip: '104.18.61.201'
      },
      {
        id: 6,
        email: 'anna.kuznetsova@example.com',
        phone: '73831234567',
        nickName: 'annakuznetsova',
        name: 'Анна Кузнецова',
        ip: '162.158.146.25'
      },
      {
        id: 7,
        email: 'emma.brown@example.com',
        phone: '442071234567',
        nickName: 'emmabrown',
        name: 'Emma Brown',
        ip: '192.0.2.146'
      },
      {
        id: 8,
        email: 'mikhail.sokolov@example.com',
        phone: '79041234567',
        nickName: 'mikhailsokolov',
        name: 'Михаил Соколов',
        ip: '198.51.100.14'
      },
      {
        id: 9,
        email: 'ivan@example.com',
        phone: '79998564567',
        nickName: 'ivanov',
        name: 'Иван Иванов',
        ip: '84.237.11.105'
      }
    ]
  },
  mutations: {
    setSearchResult(state, payload) {
      state.searchResult = payload;
    }
  },
  actions: {
    async search({ commit, state }, { keyName, query }) {
      let res = [];

      if (keyName && query) {
        res = state.users.filter((user) => {
          if (keyName === 'name') {
            return user[keyName].toLowerCase() === query;
          }

          return user[keyName] === query;
        });
      }

      commit('setSearchResult', res);
    }
  },
  getters: {
    getResult: (state) => state.searchResult
  }
});
