<template>
  <div class="player-tracking">
    <h2>Player Tracking</h2>
    <div class="tracking-mode">
      <label>
        <input type="radio" v-model="trackingMode" value="onField"> On Field
      </label>
      <label>
        <input type="radio" v-model="trackingMode" value="onBench"> On Bench
      </label>
    </div>
    <div class="player-grid-container" ref="gridContainer">
      <div class="player-grid" :style="gridStyle">
        <button 
          v-for="player in sortedActivePlayers" 
          :key="player.number"
          @click="togglePlayer(player.number)"
          :class="{ active: isPlayerActive(player.number) }"
        >
          {{ player.number }}
        </button>
      </div>
    </div>
    <div class="action-buttons">
      <button @click="savePlay" class="save-button">Save Play</button>
      <button @click="viewTeamMPR" class="view-mpr-button">View Team MPR</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'PlayerTrackingView',
  setup() {
    const store = useStore()
    const router = useRouter()
    const saveData = inject('saveData')

    const trackingMode = ref('onField')
    const gridContainer = ref(null)
    const gridStyle = ref({})

    const players = computed(() => store.state.players)
    const currentPlay = computed(() => store.state.currentPlay)
    const minPlays = computed(() => store.state.minPlays)

    const sortedActivePlayers = computed(() => {
      return players.value
        .filter(player => {
          const playCount = store.getters.playerPlayCount(player.number)
          return trackingMode.value === 'onBench' || playCount < minPlays.value
        })
        .sort((a, b) => a.number - b.number)
    })

    const isPlayerActive = (number) => {
      return trackingMode.value === 'onField' 
        ? currentPlay.value.includes(number)
        : !currentPlay.value.includes(number)
    }

    const togglePlayer = (number) => {
      store.commit('updateCurrentPlay', number)
    }

    const savePlay = () => {
      const activeCount = trackingMode.value === 'onField' 
        ? currentPlay.value.length 
        : sortedActivePlayers.value.length - currentPlay.value.length
      
      if (activeCount > 11) {
        const confirmed = confirm("There are more than 11 players on the field. Do you want to proceed?")
        if (!confirmed) return
      }
      
      store.commit('savePlay')
      saveData()
      updateGridLayout()
    }

    const viewTeamMPR = () => {
      router.push('/team-mpr')
    }

    const updateGridLayout = () => {
      if (!gridContainer.value) return

      const containerWidth = gridContainer.value.clientWidth
      const containerHeight = gridContainer.value.clientHeight
      const playerCount = sortedActivePlayers.value.length

      let columns = Math.ceil(Math.sqrt(playerCount))
      let rows = Math.ceil(playerCount / columns)

      // Adjust for portrait mode
      if (containerHeight > containerWidth) {
        [columns, rows] = [rows, columns]
      }

      gridStyle.value = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: '4px',
        height: '100%',
      }
    }

    onMounted(() => {
      updateGridLayout()
      window.addEventListener('resize', updateGridLayout)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateGridLayout)
    })

    watch(sortedActivePlayers, updateGridLayout)
    watch(trackingMode, updateGridLayout)

    return {
      trackingMode,
      sortedActivePlayers,
      isPlayerActive,
      togglePlayer,
      savePlay,
      viewTeamMPR,
      gridContainer,
      gridStyle
    }
  }
}
</script>

<style scoped>
.player-tracking {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 1rem;
}

.tracking-mode {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tracking-mode label {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--text-color);
}

.tracking-mode input[type="radio"] {
  margin-right: 0.5rem;
}

.player-grid-container {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.player-grid {
  display: grid;
  gap: 0.5rem;
  height: 100%;
}

.player-grid button {
  aspect-ratio: 1 / 1;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  transition: all 0.3s;
  cursor: pointer;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.player-grid button:hover {
  background-color: var(--secondary-color);
  color: white;
}

.player-grid button.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--active-color);
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.save-button, .view-mpr-button {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button {
  background-color: var(--success-color);
  color: white;
}

.save-button:hover {
  background-color: #35a581;
}

.view-mpr-button {
  background-color: var(--primary-color);
  color: white;
}

.view-mpr-button:hover {
  background-color: #2a3d50;
}

@media (max-width: 768px) {
  .player-grid button {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .player-tracking {
    padding: 0.5rem;
  }

  .player-grid button {
    font-size: 1rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .save-button, .view-mpr-button {
    width: 100%;
  }
}
</style>