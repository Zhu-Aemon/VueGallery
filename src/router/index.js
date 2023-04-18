import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LocalSongs from '@/views/LocalSongs.vue'
import ArtistPage from '../views/ArtistPage.vue'
import ExplorePage from '../views/ExplorePage.vue'
import StatPage from '../views/StatPage.vue'
import AlbumPage from '../views/AlbumPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/songList',
      name: 'songList',
      component: LocalSongs,
    },
    {
      path: '/artistPage',
      name: 'artistPage',
      component: ArtistPage,
    },
    {
      path: '/albumPage',
      name: 'albumPage',
      component: AlbumPage,
    },
    {
      path: '/explorePage',
      name: 'explorePage',
      component: ExplorePage,
    },
    {
      path: '/statPage',
      name: 'statPage',
      component: StatPage,
    },
  ],
})

export default router
