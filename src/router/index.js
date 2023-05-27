import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ArtistPage from '../views/ArtistPage.vue'
import ExplorePage from '../views/ExplorePage.vue'
import AlbumPage from '../views/AlbumPage.vue'
import LoginPage from '../views/LoginPage.vue'
import PlaylistPage from '../views/PlaylistPage.vue'
import TrendingPage from '@/views/TrendingPage.vue'
import Recommended from "@/views/Recommended.vue";
import SearchResults from "@/views/SearchResults.vue";
import Settings from "@/views/Settings.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Homeview',
      name: 'home',
      component: HomeView,
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
      path: '/explore',
      name: 'explorePage',
      component: ExplorePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: PlaylistPage,
    },
    {
      path: '/trending',
      name: 'trending',
      component: TrendingPage,
    },
    {
      path: '/recommended',
      name: 'recommended',
      component: Recommended,
    },
    {
      path: '/searchResults',
      name: 'searchResults',
      component: SearchResults,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
})

export default router
