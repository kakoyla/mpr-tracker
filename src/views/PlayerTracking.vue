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
      // Call updateGridLayout after saving the play
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

    // Watch for changes in sortedActivePlayers and update layout
    watch(sortedActivePlayers, updateGridLayout)

    // Watch for changes in trackingMode and update layout
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
}

h2 {
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
}

.tracking-mode input[type="radio"] {
  margin-right: 0.5rem;
}

.player-grid-container {
  flex-grow: 1;
  overflow: hidden;
  margin-bottom: 1rem;
}

.player-grid button {
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #ecf0f1;
  color: var(--text-color);
  border: 2px solid var(--border-color);
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 100%;
  height: 100%;
}

.player-grid button:hover {
  background-color: #d5dbdb;
}

.player-grid button.active {
  background-color: var(--secondary-color);
  color: white;
  border-color: var(--secondary-color);
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
  background-color: var(--secondary-color);
  color: white;
}

.save-button:hover {
  background-color: #27ae60;
}

.view-mpr-button {
  background-color: var(--primary-color);
  color: white;
}

.view-mpr-button:hover {
  background-color: #2980b9;
}

@media (max-width: 480px) {
  .action-buttons {
    flex-direction: column;
  }

  .save-button, .view-mpr-button {
    width: 100%;
  }
}
</style>