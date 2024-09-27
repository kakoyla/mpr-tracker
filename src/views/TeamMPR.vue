<template>
  <div class="team-mpr">
    <h2>Team MPR</h2>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Plays</th>
            <th>Remaining</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in sortedPlayersMPR" :key="player.number" :class="{ completed: player.status === 'Completed' }">
            <td>{{ player.number }}</td>
            <td>{{ player.firstName }} {{ player.lastName }}</td>
            <td>
              <input 
                v-if="editingPlayer === player.number" 
                v-model.number="editPlayCount" 
                type="number" 
                min="0"
              >
              <span v-else>{{ player.plays }}</span>
            </td>
            <td>{{ player.playsRemaining }}</td>
            <td :class="{ 'status-completed': player.status === 'Completed' }">{{ player.status }}</td>
            <td>
              <button v-if="editingPlayer === player.number" @click="savePlayCount(player.number)" class="save-button">Save</button>
              <button v-else @click="startEditing(player)" class="edit-button">Edit</button>
              <button v-if="editingPlayer === player.number" @click="cancelEditing" class="cancel-button">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="backToTracking" class="back-button">Back to Tracking</button>
  </div>
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'TeamMPRView',
  setup() {
    const store = useStore()
    const router = useRouter()
    const saveData = inject('saveData')

    const editingPlayer = ref(null)
    const editPlayCount = ref(0)

    const playersMPR = computed(() => {
      const minPlays = store.state.minPlays
      return store.state.players.map(player => {
        const plays = store.getters.playerPlayCount(player.number)
        const playsRemaining = Math.max(0, minPlays - plays)
        return {
          ...player,
          plays,
          playsRemaining,
          status: plays >= minPlays ? 'Completed' : 'In Progress'
        }
      })
    })

    const sortedPlayersMPR = computed(() => {
      const inProgress = playersMPR.value.filter(player => player.status === 'In Progress')
      const completed = playersMPR.value.filter(player => player.status === 'Completed')

      const sortPlayers = (a, b) => {
        if (a.plays !== b.plays) {
          return a.plays - b.plays // Sort by plays (ascending)
        }
        return a.number - b.number // Then sort by number (ascending)
      }

      inProgress.sort(sortPlayers)
      completed.sort((a, b) => {
        if (a.plays !== b.plays) {
          return b.plays - a.plays // Sort by plays (descending for completed)
        }
        return a.number - b.number // Then sort by number (descending)
      })

      return [...inProgress, ...completed]
    })

    const startEditing = (player) => {
      editingPlayer.value = player.number
      editPlayCount.value = player.plays
    }

    const savePlayCount = (playerNumber) => {
      store.commit('updatePlayerPlayCount', { playerNumber, playCount: editPlayCount.value })
      editingPlayer.value = null
      saveData()
    }

    const cancelEditing = () => {
      editingPlayer.value = null
    }

    const backToTracking = () => {
      router.push('/tracking')
    }

    return {
      sortedPlayersMPR,
      editingPlayer,
      editPlayCount,
      startEditing,
      savePlayCount,
      cancelEditing,
      backToTracking
    }
  }
}
</script>

<style scoped>
.team-mpr {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 1rem;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
  white-space: nowrap;
}

tr:nth-child(even) {
  background-color: var(--background-color);
}

tr.completed {
  background-color: #e8f5e9;
}

td.status-completed {
  font-weight: bold;
  color: var(--success-color);
}

input[type="number"] {
  width: 60px;
  padding: 0.25rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.edit-button, .save-button, .cancel-button {
  padding: 0.25rem 0.5rem;
  margin: 0 0.25rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button {
  background-color: var(--secondary-color);
  color: white;
}

.edit-button:hover {
  background-color: #4ca8a6;
}

.save-button {
  background-color: var(--success-color);
  color: white;
}

.save-button:hover {
  background-color: #35a581;
}

.cancel-button {
  background-color: var(--error-color);
  color: white;
}

.cancel-button:hover {
  background-color: #c13c3c;
}

.back-button {
  display: block;
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #2a3d50;
}

@media (max-width: 768px) {
  .team-mpr {
    padding: 0.5rem;
  }

  table {
    font-size: 0.9rem;
  }

  th, td {
    padding: 0.5rem;
  }

  .edit-button, .save-button, .cancel-button {
    padding: 0.2rem 0.4rem;
    font-size: 0.8rem;
  }

  .back-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}
</style>