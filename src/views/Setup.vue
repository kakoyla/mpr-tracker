<template>
  <div class="team-setup">
    <h2>Team Setup</h2>
    <form @submit.prevent="editMode ? updatePlayer() : addPlayer()" class="player-form">
      <input v-model="newPlayer.firstName" placeholder="First Name" required>
      <input v-model="newPlayer.lastName" placeholder="Last Name" required>
      <input v-model.number="newPlayer.number" type="number" placeholder="Player Number" required>
      <button type="submit">{{ editMode ? 'Update Player' : 'Add Player' }}</button>
      <button v-if="editMode" type="button" @click="cancelEdit" class="cancel-button">Cancel</button>
    </form>
    <div class="team-roster">
      <h3>Team Roster</h3>
      <ul>
        <li v-for="player in players" :key="player.number">
          <span>{{ player.number }} - {{ player.firstName }} {{ player.lastName }}</span>
          <div>
            <button @click="editPlayer(player)" class="edit-button">Edit</button>
            <button @click="removePlayer(player.number)" class="remove-button">Remove</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="min-plays">
      <label for="minPlays">Minimum Plays Required:</label>
      <input id="minPlays" v-model.number="minPlays" type="number" required>
    </div>
    <button @click="saveTeam" :disabled="!canSaveTeam" class="save-team-button">Save Team</button>
    
    <div class="export-import">
      <button @click="exportTeam" class="export-button">Export Team</button>
      <input type="file" @change="importTeam" ref="fileInput" style="display:none">
      <button @click="$refs.fileInput.click()" class="import-button">Import Team</button>
    </div>
    
    <div class="clear-data">
      <button @click="clearAllData" class="clear-data-button">Clear All Data</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'TeamSetup',
  setup() {
    const store = useStore()
    const router = useRouter()
    const saveData = inject('saveData')

    const newPlayer = ref({ firstName: '', lastName: '', number: '' })
    const minPlays = ref(12) // Default to 12
    const editMode = ref(false)
    const editingIndex = ref(-1)

    const players = computed(() => store.state.players)

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    }

    const addPlayer = () => {
      const playerToAdd = {
        ...newPlayer.value,
        firstName: capitalizeFirstLetter(newPlayer.value.firstName),
        lastName: capitalizeFirstLetter(newPlayer.value.lastName)
      }
      store.commit('addPlayer', playerToAdd)
      newPlayer.value = { firstName: '', lastName: '', number: '' }
      saveData()
    }

    const editPlayer = (player) => {
      newPlayer.value = { ...player }
      editMode.value = true
      editingIndex.value = players.value.findIndex(p => p.number === player.number)
    }

    const updatePlayer = () => {
      const updatedPlayer = {
        ...newPlayer.value,
        firstName: capitalizeFirstLetter(newPlayer.value.firstName),
        lastName: capitalizeFirstLetter(newPlayer.value.lastName)
      }
      store.commit('updatePlayer', { index: editingIndex.value, player: updatedPlayer })
      cancelEdit()
      saveData()
    }

    const cancelEdit = () => {
      newPlayer.value = { firstName: '', lastName: '', number: '' }
      editMode.value = false
      editingIndex.value = -1
    }

    const removePlayer = (number) => {
      store.commit('removePlayer', number)
      saveData()
    }

    const canSaveTeam = computed(() => players.value.length > 0 && minPlays.value > 0)

    const saveTeam = () => {
      store.commit('setMinPlays', minPlays.value)
      saveData()
      router.push('/tracking')
    }

    const exportTeam = () => {
      const data = {
        players: players.value,
        minPlays: minPlays.value,
        playerPlayCounts: store.state.playerPlayCounts
      }
      const jsonString = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'team_data.json'
      link.click()
      URL.revokeObjectURL(url)
    }

    const importTeam = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result)
            store.commit('setPlayers', data.players)
            store.commit('setMinPlays', data.minPlays)
            if (data.playerPlayCounts) {
              Object.entries(data.playerPlayCounts).forEach(([playerNumber, count]) => {
                store.commit('updatePlayerPlayCount', { playerNumber: parseInt(playerNumber), playCount: count })
              })
            }
            minPlays.value = data.minPlays
            saveData()
            alert('Team data imported successfully!')
          } catch (error) {
            alert('Error importing team data. Please make sure the file is correct.')
            console.error('Import error:', error)
          }
        }
        reader.readAsText(file)
      }
    }

    const clearAllData = () => {
      if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        store.commit('clearAllData')
        minPlays.value = 12 // Reset to default
        saveData()
        alert('All data has been cleared.')
      }
    }

    return {
      newPlayer,
      players,
      minPlays,
      editMode,
      addPlayer,
      editPlayer,
      updatePlayer,
      cancelEdit,
      removePlayer,
      canSaveTeam,
      saveTeam,
      exportTeam,
      importTeam,
      clearAllData
    }
  }
}
</script>

<style scoped>
.team-setup {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.player-form {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.team-roster ul {
  list-style-type: none;
  padding: 0;
}

.team-roster li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.team-roster li:last-child {
  border-bottom: none;
}

.min-plays {
  margin-bottom: 1rem;
}

.save-team-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.export-import {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 1rem;
}

.export-button, .import-button {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
}

.export-button {
  background-color: #3498db; /* Blue color */
  color: white;
}

.export-button:hover {
  background-color: #2980b9;
}

.import-button {
  background-color: #9b59b6; /* Purple color */
  color: white;
}

.import-button:hover {
  background-color: #8e44ad;
}

.export-button:active, .import-button:active {
  transform: scale(0.98);
}

.clear-data {
  margin-top: 2rem;
}

.clear-data-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.clear-data-button:hover {
  background-color: #c0392b;
}

.cancel-button {
  background-color: #e74c3c;
}

.cancel-button:hover {
  background-color: #c0392b;
}

.edit-button {
  background-color: #f39c12;
}

.edit-button:hover {
  background-color: #d35400;
}

.remove-button {
  background-color: #e74c3c;
}

.remove-button:hover {
  background-color: #c0392b;
}

@media (max-width: 480px) {
  .team-setup {
    padding: 1rem;
  }

  .export-import {
    flex-direction: column;
  }
  
  .export-button, .import-button {
    width: 100%;
  }
}
</style>