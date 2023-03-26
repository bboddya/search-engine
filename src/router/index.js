import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from '@/views/Search';
import SearchResults from '@/views/SearchResults';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  },
  {
    path: '/results',
    name: 'SearchResults',
    component: SearchResults
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
