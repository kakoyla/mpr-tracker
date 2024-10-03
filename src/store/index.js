
import { createStore } from 'vuex'

export default createStore({
  state: {
    players: [],
    minPlays: 0,
    currentPlay: [],
    playHistory: [],
    playerPlayCounts: {},
    selectedPlayers: [],
    lineups: []
  },
  mutations: {
    addPlayer(state, player) {
      state.players.push(player)
    },
    updatePlayer(state, { index, player }) {
      state.players.splice(index, 1, player)
    },
    removePlayer(state, number) {
      state.players = state.players.filter(p => p.number !== number)
    },
    setMinPlays(state, minPlays) {
      state.minPlays = minPlays
    },
    setPlayers(state, players) {
      state.players = players
    },
    updateCurrentPlay(state, playerNumber) {
      const index = state.currentPlay.indexOf(playerNumber)
      if (index > -1) {
        state.currentPlay.splice(index, 1)
      } else {
        state.currentPlay.push(playerNumber)
      }
    },
    savePlay(state, playersToUpdate) {
      state.playHistory.push([...playersToUpdate])
      playersToUpdate.forEach(playerNumber => {
        state.playerPlayCounts[playerNumber] = (state.playerPlayCounts[playerNumber] || 0) + 1
      })
      state.currentPlay = []
    },
    updatePlayerPlayCount(state, { playerNumber, playCount }) {
      state.playerPlayCounts[playerNumber] = playCount
    },
    clearAllPlays(state) {
      state.currentPlay = []
      state.playHistory = []
      state.playerPlayCounts = {}
      // Note: We're not clearing selectedPlayers here
    },
    clearAllData(state) {
      state.players = []
      state.minPlays = 12
      state.currentPlay = []
      state.playHistory = []
      state.playerPlayCounts = {}
      state.selectedPlayers = []
      state.lineups = []
    },
    setSelectedPlayers(state, players) {
      state.selectedPlayers = players
    },
    updateSelectedPlayers(state, players) {
      state.selectedPlayers = players
    },
    addLineup(state, lineup) {
      state.lineups.push(lineup)
    },
    updateLineup(state, { index, lineup }) {
      state.lineups.splice(index, 1, lineup)
    },
    deleteLineup(state, index) {
      state.lineups.splice(index, 1)
    },
    setLineups(state, lineups) {
      state.lineups = lineups
    },
    clearLineups(state) {
      state.lineups = []
    }
  },
  actions: {
    initializeStore({ commit }) {
      const storedData = localStorage.getItem('teamData')
      if (storedData) {
        const { players, minPlays, playerPlayCounts, selectedPlayers, lineups } = JSON.parse(storedData)
        commit('setPlayers', players)
        commit('setMinPlays', minPlays)
        if (playerPlayCounts) {
          Object.entries(playerPlayCounts).forEach(([playerNumber, count]) => {
            commit('updatePlayerPlayCount', { playerNumber: parseInt(playerNumber), playCount: count })
          })
        }
        if (selectedPlayers) {
          commit('setSelectedPlayers', selectedPlayers)
        }
        if (lineups) {
          commit('setLineups', lineups)
        }
      }
    },
    saveToLocalStorage({ state }) {
      localStorage.setItem('teamData', JSON.stringify({
        players: state.players,
        minPlays: state.minPlays,
        playerPlayCounts: state.playerPlayCounts,
        selectedPlayers: state.selectedPlayers,
        lineups: state.lineups
      }))
    },
    updateSelectedPlayers({ commit }, players) {
      commit('updateSelectedPlayers', players)
    }
  },
  getters: {
    playerPlayCount: (state) => (playerNumber) => {
      return state.playerPlayCounts[playerNumber] || 0
    },
    getLineupsByPlayer: (state) => (playerNumber) => {
      return state.lineups.filter(lineup => lineup.players.includes(playerNumber))
    },
    onBenchPlayers: (state) => {
      return state.players
        .filter(player => !state.selectedPlayers.includes(player.number))
        .map(player => player.number)
    }
  }
})