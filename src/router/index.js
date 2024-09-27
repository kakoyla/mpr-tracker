import { createRouter, createWebHashHistory } from 'vue-router'
import TeamSetup from '../views/Setup.vue'
import PlayerTracking from '../views/PlayerTracking.vue'
import TeamMPR from '../views/TeamMPR.vue'

const routes = [
  {
    path: '/',
    name: 'TeamSetup',
    component: TeamSetup
  },
  {
    path: '/tracking',
    name: 'PlayerTracking',
    component: PlayerTracking
  },
  {
    path: '/team-mpr',
    name: 'TeamMPR',
    component: TeamMPR
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router