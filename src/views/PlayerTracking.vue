<template>
  <div class="player-tracking">
    <div class="tracking-controls">
      <div class="tracking-mode">
        <span class="mode-label">On Field</span>
        <label class="switch">
          <input type="checkbox" v-model="isOnBench">
          <span class="slider round"></span>
        </label>
        <span class="mode-label">On Bench</span>
      </div>
      <button @click="showLoadLineupModal = true" class="load-lineup-button">Load Lineup</button>
    </div>
    <div class="action-buttons">
      <button @click="clearAllActive" class="clear-all-button">
        {{ isOnBench ? 'Clear All Bench Players' : 'Move All to Bench' }}
      </button>
      <span class="active-count">Active On-Field Players: {{ activeOnFieldCount }}</span>
    </div>
    <div class="player-grid-container" ref="gridContainer">
      <div class="player-grid" :style="gridStyle">
        <button 
          v-for="player in sortedDisplayedPlayers" 
          :key="player.number"
          @click="togglePlayer(player.number)"
          :class="{ 
            active: isPlayerActive(player.number), 
            ineligible: !eligiblePlayers.map(p => p.number).includes(player.number)
          }"
          :disabled="!isOnBench && !eligiblePlayers.map(p => p.number).includes(player.number)"
        >
          {{ player.number }}
        </button>
      </div>
    </div>
    <div class="action-buttons">
      <button @click="savePlay" class="save-button">Save Play</button>
      <button @click="viewTeamMPR" class="view-mpr-button">View Team MPR</button>
    </div>
    <div v-if="showSaved" class="saved-message">Saved</div>

    <!-- Load Lineup Modal -->
    <div v-if="showLoadLineupModal" class="modal">
      <div class="modal-content">
        <h3>Load Lineup</h3>
        <select v-model="selectedLineupIndex">
          <option v-for="(lineup, index) in lineups" :key="index" :value="index">
            {{ lineup.name }} ({{ lineup.players.length }} players)
          </option>
        </select>
        <div class="lineup-info">
          <p><strong>Note:</strong></p>
          <ul>
            <li>Loading a lineup with 11 players will set all other eligible players to bench.</li>
            <li>Loading a lineup with fewer than 11 players will move those players to the field if they were on the bench.</li>
          </ul>
        </div>
        <button @click="loadLineup" :disabled="selectedLineupIndex === null">Load</button>
        <button @click="closeLoadLineupModal">Cancel</button>
      </div>
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

    const isOnBench = ref(false)
    const gridContainer = ref(null)
    const gridStyle = ref({})
    const showSaved = ref(false)
    const showLoadLineupModal = ref(false)
    const selectedLineupIndex = ref(null)

    const players = computed(() => store.state.players)
    const minPlays = computed(() => store.state.minPlays)
    const lineups = computed(() => store.state.lineups)
    
    const selectedPlayers = computed({
      get: () => store.state.selectedPlayers,
      set: (value) => store.dispatch('updateSelectedPlayers', value)
    })

    const onBenchPlayers = computed(() => store.getters.onBenchPlayers)

    const eligiblePlayers = computed(() => 
      players.value.filter(player => {
        const playCount = store.getters.playerPlayCount(player.number)
        return playCount < minPlays.value
      })
    )

    const activeOnFieldCount = computed(() => selectedPlayers.value.length)

    const sortedDisplayedPlayers = computed(() => {
      return (isOnBench.value ? players.value : eligiblePlayers.value)
        .sort((a, b) => a.number - b.number)
    })

    const isPlayerActive = (number) => {
      return isOnBench.value ? onBenchPlayers.value.includes(number) : selectedPlayers.value.includes(number)
    }

    const togglePlayer = (number) => {
      const updatedPlayers = [...selectedPlayers.value]
      const index = updatedPlayers.indexOf(number)
      if (index > -1) {
        updatedPlayers.splice(index, 1)
      } else {
        updatedPlayers.push(number)
      }
      store.dispatch('updateSelectedPlayers', updatedPlayers)
    }

    const clearAllActive = () => {
      if (isOnBench.value) {
        store.dispatch('updateSelectedPlayers', eligiblePlayers.value.map(player => player.number))
      } else {
        store.dispatch('updateSelectedPlayers', [])
      }
    }

    const savePlay = () => {
      if (selectedPlayers.value.length > 11) {
        const confirmed = confirm("There are more than 11 players on the field. Do you want to proceed?")
        if (!confirmed) return
      }
      
      store.commit('savePlay', selectedPlayers.value)
      saveData()
      updateGridLayout()

      // Show "Saved" message
      showSaved.value = true
      setTimeout(() => {
        showSaved.value = false
      }, 1000)
    }

    const viewTeamMPR = () => {
      router.push('/team-mpr')
    }

    const updateGridLayout = () => {
      if (!gridContainer.value) return

      const containerWidth = gridContainer.value.clientWidth
      const containerHeight = gridContainer.value.clientHeight
      const playerCount = sortedDisplayedPlayers.value.length

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

    const loadLineup = () => {
      if (selectedLineupIndex.value === null) return
      const lineup = lineups.value[selectedLineupIndex.value]
      
      if (lineup.players.length === 11) {
        // If the lineup has exactly 11 players, set these as selected players
        store.dispatch('updateSelectedPlayers', lineup.players)
      } else {
        // If the lineup has less than 11 players, add them to the current selection
        const newSelectedPlayers = new Set(selectedPlayers.value)
        lineup.players.forEach(playerNumber => {
          newSelectedPlayers.add(playerNumber)
        })
        store.dispatch('updateSelectedPlayers', Array.from(newSelectedPlayers))
      }
      
      closeLoadLineupModal()
    }

    const closeLoadLineupModal = () => {
      showLoadLineupModal.value = false
      selectedLineupIndex.value = null
    }

    onMounted(() => {
      updateGridLayout()
      window.addEventListener('resize', updateGridLayout)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateGridLayout)
    })

    watch(sortedDisplayedPlayers, updateGridLayout)

    return {
      isOnBench,
      sortedDisplayedPlayers,
      isPlayerActive,
      togglePlayer,
      clearAllActive,
      savePlay,
      viewTeamMPR,
      gridContainer,
      gridStyle,
      showSaved,
      showLoadLineupModal,
      selectedLineupIndex,
      lineups,
      loadLineup,
      closeLoadLineupModal,
      activeOnFieldCount,
      eligiblePlayers
    }
  }
}
</script>

<style scoped>
.player-tracking {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  padding: 1rem;
}

.tracking-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.tracking-mode {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin: 0 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--primary-color);
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #ccc;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.mode-label {
  font-weight: bold;
}

.load-lineup-button {
  padding: 0.5rem 1rem;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
.player-grid button.ineligible {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.save-button, .view-mpr-button, .clear-all-button {
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

.clear-all-button {
  background-color: var(--error-color);
  color: white;
}

.clear-all-button:hover {
  background-color: #c13c3c;
}

.active-count {
  font-weight: bold;
  margin-left: 1rem;
  white-space: nowrap;
}

.saved-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  animation: fadeInOut 1s ease-in-out;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.modal-content button {
  margin-right: 0.5rem;
}

.lineup-info {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.lineup-info ul {
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

.lineup-info li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .player-grid button {
    font-size: 1.2rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .active-count {
    margin-left: 0;
    margin-top: 0.5rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .player-tracking {
    padding: 0.5rem;
  }

  .player-grid button {
    font-size: 1rem;
  }

  .save-button, .view-mpr-button, .clear-all-button {
    width: 100%;
  }
}
</style>