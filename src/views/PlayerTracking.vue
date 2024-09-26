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
    <div class="player-grid">
      <button 
        v-for="player in sortedActivePlayers" 
        :key="player.number"
        @click="togglePlayer(player.number)"
        :class="{ active: isPlayerActive(player.number) }"
      >
        {{ player.number }}
      </button>
    </div>
    <div class="action-buttons">
      <button @click="savePlay" class="save-button">Save Play</button>
      <button @click="viewTeamMPR" class="view-mpr-button">View Team MPR</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'PlayerTrackingView',
  setup() {
    const store = useStore()
    const router = useRouter()
    const saveData = inject('saveData')

    const trackingMode = ref('onField')

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
    }

    const viewTeamMPR = () => {
      router.push('/team-mpr')
    }

    return {
      trackingMode,
      sortedActivePlayers,
      isPlayerActive,
      togglePlayer,
      savePlay,
      viewTeamMPR
    }
  }
}
</script>

<style scoped>
.player-tracking {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

.player-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.player-grid button {
  aspect-ratio: 1;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #ecf0f1;
  color: var(--text-color);
  border: 2px solid var(--border-color);
  transition: all 0.3s;
  cursor: pointer;
  padding: 0;
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
  flex-wrap: wrap;
  gap: 0.5rem;
}

.save-button, .view-mpr-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  flex: 1;
  min-width: 120px;
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
  .player-grid {
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
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