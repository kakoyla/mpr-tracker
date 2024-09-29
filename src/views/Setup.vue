<template>
  <div class="team-setup">
    <h2>Team Setup</h2>
    <form @submit.prevent="editMode ? updatePlayer() : addPlayer()" class="player-form">
      <input v-model="newPlayer.firstName" placeholder="First Name" required>
      <input v-model="newPlayer.lastName" placeholder="Last Name" required>
      <input v-model.number="newPlayer.number" type="number" placeholder="Player Number" required>
      <button v-if="!editMode" type="submit">Add Player</button>
      <template v-else>
        <button @click="editPlayerLineups(newPlayer.number)" type="button" class="edit-lineups-button">Edit Lineups</button>
        <button type="submit" class="update-player-button">Update Player</button>
        <button type="button" @click="cancelEdit" class="cancel-button">Cancel</button>
      </template>
    </form>
    <div class="team-roster">
      <h3>Team Roster</h3>
      <ul>
        <li v-for="player in sortedPlayers" :key="player.number">
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
    <button @click="saveTeam" :disabled="!canSaveTeam" class="save-team-button">Save</button>
    
    <div class="export-import">
      <button @click="exportTeam" class="export-button">Export Team</button>
      <input type="file" @change="importTeam" ref="fileInput" style="display:none">
      <button @click="$refs.fileInput.click()" class="import-button">Import Team</button>
    </div>
    
    <div class="clear-data">
      <h3>Clear Data Options</h3>
      <button @click="clearAllPlays" class="clear-plays-button">Clear All Plays</button>
      <button @click="clearEntireTeam" class="clear-team-button">Remove Entire Team</button>
    </div>

    <div class="lineup-management">
      <h3>Lineup Management</h3>
      <button @click="showLineupModal = true" class="create-lineup-button">Create Lineup</button>
      <button @click="showEditLineupModal = true" class="edit-lineup-button">Edit Lineup</button>
    </div>

    <!-- Create Lineup Modal -->
    <div v-if="showLineupModal" class="modal">
      <div class="modal-content">
        <h3>Create Lineup</h3>
        <input v-model="newLineupName" placeholder="Lineup Name" required>
        <div class="player-selection">
          <button 
            v-for="player in sortedPlayers" 
            :key="player.number"
            @click="togglePlayerInLineup(player.number)"
            :class="{ selected: newLineupPlayers.includes(player.number) }"
          >
            {{ player.number }} - {{ player.firstName }} {{ player.lastName }}
          </button>
        </div>
        <p>Selected Players: {{ newLineupPlayers.length }}/11</p>
        <button @click="saveLineup" :disabled="!canSaveLineup">Save Lineup</button>
        <button @click="closeLineupModal">Cancel</button>
      </div>
    </div>

    <!-- Edit Lineup Modal -->
    <div v-if="showEditLineupModal" class="modal">
      <div class="modal-content">
        <h3>Edit Lineup</h3>
        <select v-model="editingLineupIndex">
          <option v-for="(lineup, index) in lineups" :key="index" :value="index">
            {{ lineup.name }}
          </option>
        </select>
        <input v-if="editingLineupIndex !== null" v-model="lineups[editingLineupIndex].name" placeholder="Lineup Name" required>
        <div v-if="editingLineupIndex !== null" class="player-selection">
          <button 
            v-for="player in sortedPlayers" 
            :key="player.number"
            @click="togglePlayerInEditingLineup(player.number)"
            :class="{ selected: lineups[editingLineupIndex].players.includes(player.number) }"
          >
            {{ player.number }} - {{ player.firstName }} {{ player.lastName }}
          </button>
        </div>
        <p v-if="editingLineupIndex !== null">Selected Players: {{ lineups[editingLineupIndex].players.length }}/11</p>
        <button @click="updateLineup" :disabled="!canUpdateLineup">Update Lineup</button>
        <button @click="deleteLineup" v-if="editingLineupIndex !== null">Delete Lineup</button>
        <button @click="closeEditLineupModal">Cancel</button>
      </div>
    </div>

    <!-- Edit Player Lineups Modal -->
    <div v-if="showPlayerLineupsModal" class="modal">
      <div class="modal-content player-lineups-modal">
        <h3>Edit Player Lineups</h3>
        <p class="player-name">
          {{ players.find(p => p.number === editingPlayerNumber)?.firstName }}
          {{ players.find(p => p.number === editingPlayerNumber)?.lastName }}
          ({{ editingPlayerNumber }})
        </p>
        <div class="lineup-list">
          <div v-if="playerLineups.length === 0" class="no-lineups">
            This player is not in any lineups.
          </div>
          <div v-else v-for="(lineup, index) in playerLineups" :key="index" class="lineup-item">
            <span class="lineup-name">{{ lineup.name }}</span>
            <button @click="removePlayerFromLineup(index)" class="remove-button">Remove</button>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="closePlayerLineupsModal" class="ok-button">OK</button>
        </div>
      </div>
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

    const showLineupModal = ref(false)
    const showEditLineupModal = ref(false)
    const showPlayerLineupsModal = ref(false)
    const newLineupName = ref('')
    const newLineupPlayers = ref([])
    const editingLineupIndex = ref(null)
    const editingPlayerNumber = ref(null)

    const players = computed(() => store.state.players)
    const lineups = computed(() => store.state.lineups)

    const sortedPlayers = computed(() => {
      return [...players.value].sort((a, b) => a.number - b.number)
    })

    const playerLineups = computed(() => {
      if (editingPlayerNumber.value === null) return []
      return store.getters.getLineupsByPlayer(editingPlayerNumber.value)
    })

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
      // Scroll to top of the page
      window.scrollTo(0, 0)
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
        playerPlayCounts: store.state.playerPlayCounts,
        lineups: store.state.lineups
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
            if (data.lineups) {
              store.commit('setLineups', data.lineups)
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

    const clearAllPlays = () => {
      if (confirm('Are you sure you want to clear all plays? This action cannot be undone.')) {
        store.commit('clearAllPlays')
        saveData()
        alert('All plays have been cleared.')
      }
    }

    const clearEntireTeam = () => {
      if (confirm('Are you sure you want to remove the entire team, all plays, and all lineups? This action cannot be undone.')) {
        store.commit('clearAllData')
        store.commit('clearLineups')
        minPlays.value = 12 // Reset to default
        saveData()
        alert('The entire team, all plays, and all lineups have been removed.')
      }
    }

    const togglePlayerInLineup = (playerNumber) => {
      const index = newLineupPlayers.value.indexOf(playerNumber)
      if (index > -1) {
        newLineupPlayers.value.splice(index, 1)
      } else if (newLineupPlayers.value.length < 11) {
        newLineupPlayers.value.push(playerNumber)
      }
    }

    const togglePlayerInEditingLineup = (playerNumber) => {
      if (editingLineupIndex.value === null) return
      const lineup = lineups.value[editingLineupIndex.value]
      const index = lineup.players.indexOf(playerNumber)
      if (index > -1) {
        lineup.players.splice(index, 1)
      } else if (lineup.players.length < 11) {
        lineup.players.push(playerNumber)
      }
    }

    const canSaveLineup = computed(() => 
      newLineupName.value.trim() !== '' && 
      newLineupPlayers.value.length > 0 && 
      newLineupPlayers.value.length <= 11
    )

    const canUpdateLineup = computed(() => 
      editingLineupIndex.value !== null &&
      lineups.value[editingLineupIndex.value].name.trim() !== '' && 
      lineups.value[editingLineupIndex.value].players.length > 0 && 
      lineups.value[editingLineupIndex.value].players.length <= 11
    )

    const saveLineup = () => {
      store.commit('addLineup', {
        name: newLineupName.value,
        players: newLineupPlayers.value
      })
      closeLineupModal()
      saveData()
    }

    const updateLineup = () => {
      if (editingLineupIndex.value === null) return
      store.commit('updateLineup', {
        index: editingLineupIndex.value,
        lineup: lineups.value[editingLineupIndex.value]
      })
      closeEditLineupModal()
      saveData()
    }

    const deleteLineup = () => {
      if (editingLineupIndex.value === null) return
      if (confirm('Are you sure you want to delete this lineup?')) {
        store.commit('deleteLineup', editingLineupIndex.value)
        closeEditLineupModal()
        saveData()
      }
    }

    const closeLineupModal = () => {
      showLineupModal.value = false
      newLineupName.value = ''
      newLineupPlayers.value = []
    }

    const closeEditLineupModal = () => {
      showEditLineupModal.value = false
      editingLineupIndex.value = null
    }

    const editPlayerLineups = (playerNumber) => {
      editingPlayerNumber.value = playerNumber
      showPlayerLineupsModal.value = true
    }

    const removePlayerFromLineup = (lineupIndex) => {
      const lineup = playerLineups.value[lineupIndex]
      const updatedLineup = {
        ...lineup,
        players: lineup.players.filter(p => p !== editingPlayerNumber.value)
      }
      const storeIndex = lineups.value.findIndex(l => l.name === lineup.name)
      if (storeIndex !== -1) {
        store.commit('updateLineup', { index: storeIndex, lineup: updatedLineup })
        saveData()
      }
    }

    const closePlayerLineupsModal = () => {
      showPlayerLineupsModal.value = false
      editingPlayerNumber.value = null
    }

    return {
      newPlayer,
      players,
      sortedPlayers,
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
      clearAllPlays,
      clearEntireTeam,
      showLineupModal,
      showEditLineupModal,
      showPlayerLineupsModal,
      newLineupName,
      newLineupPlayers,
      editingLineupIndex,
      lineups,
      playerLineups,
      togglePlayerInLineup,
      togglePlayerInEditingLineup,
      canSaveLineup,
      canUpdateLineup,
      saveLineup,
      updateLineup,
      deleteLineup,
      closeLineupModal,
      closeEditLineupModal,
      editPlayerLineups,
      removePlayerFromLineup,
      closePlayerLineupsModal,
      editingPlayerNumber
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

h2, h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.player-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.player-form input {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.player-form button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-lineups-button {
  background-color: var(--primary-color);
  color: white;
}

.edit-lineups-button:hover {
  background-color: #2a3d50;
}

.update-player-button {
  background-color: var(--success-color);
  color: white;
}

.update-player-button:hover {
  background-color: #35a581;
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
  background-color: var(--success-color);
  color: white;
}

.save-team-button:hover {
  background-color: #35a581;
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
}

.export-button {
  background-color: var(--secondary-color);
  color: var(--text-color);
}

.export-button:hover {
  background-color: #4ca8a6;
}

.import-button {
  background-color: var(--primary-color);
  color: white;
}

.import-button:hover {
  background-color: #2a3d50;
}

.clear-data {
  margin-top: 2rem;
}

.clear-plays-button, .clear-team-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  color: white;
  margin-bottom: 1rem;
}

.clear-plays-button {
  background-color: var(--secondary-color);
}

.clear-plays-button:hover {
  background-color: #4ca8a6;
}

.clear-team-button {
  background-color: var(--error-color);
}

.clear-team-button:hover {
  background-color: #c13c3c;
}

.cancel-button {
  background-color: var(--error-color);
  color: white;
}

.cancel-button:hover {
  background-color: #c13c3c;
}

.edit-button {
  background-color: var(--secondary-color);
  color: var(--text-color);
}

.edit-button:hover {
  background-color: #4ca8a6;
}

.remove-button {
  background-color: var(--error-color);
  color: white;
}

.remove-button:hover {
  background-color: #c13c3c;
}

.lineup-management {
  margin-top: 2rem;
}

.create-lineup-button, .edit-lineup-button {
  width: 48%;
  padding: 0.75rem;
  font-size: 1rem;
  margin-right: 2%;
}

.create-lineup-button {
  background-color: var(--success-color);
  color: white;
}

.create-lineup-button:hover {
  background-color: #35a581;
}

.edit-lineup-button {
  background-color: var(--primary-color);
  color: white;
}

.edit-lineup-button:hover {
  background-color: #2a3d50;
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
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
}

.player-selection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
  margin: 1rem 0;
}

.player-selection button {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  cursor: pointer;
}

.player-selection button.selected {
  background-color: var(--primary-color);
  color: white;
}

.modal-content select, .modal-content input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.modal-content button {
  margin-right: 0.5rem;
}

.player-lineups-modal {
  width: 100%;
  max-width: 500px;
}

.player-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.lineup-list {
  margin-bottom: 1rem;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.no-lineups {
  padding: 1rem;
  text-align: center;
  color: var(--text-color);
}

.lineup-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--border-color);
}

.lineup-item:last-child {
  border-bottom: none;
}

.lineup-name {
  font-weight: 500;
}

.lineup-item .remove-button {
  padding: 0.25rem 0.5rem;
  font-size: 0.9em;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.update-button {
  padding: 0.5rem 1rem;
  font-size: 1em;
}

.ok-button {
    padding: 0.5rem 1rem;
    font-size: 1em;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .ok-button:hover {
    background-color: #2a3d50;
  }

@media (max-width: 768px) {
  .team-setup {
    padding: 1rem;
  }

  .export-import, .lineup-management {
    flex-direction: column;
  }

  .export-button, .import-button, .create-lineup-button, .edit-lineup-button {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .modal-content {
    max-width: 95%;
    max-height: 95%;
    padding: 1rem;
  }

  .player-selection {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>