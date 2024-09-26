import { createStore } from 'vuex'

export default createStore({
  state: {
    players: [],
    minPlays: 0,
    currentPlay: [],
    playHistory: [],
    playerPlayCounts: {}
  },
  mutations: {
    addPlayer(state, player) {
      state.players.push(player)
      state.playerPlayCounts[player.number] = 0
    },
    updatePlayer(state, { index, player }) {
      state.players.splice(index, 1, player)
    },
    removePlayer(state, number) {
      state.players = state.players.filter(p => p.number !== number)
      delete state.playerPlayCounts[number]
    },
    setMinPlays(state, minPlays) {
      state.minPlays = minPlays
    },
    setPlayers(state, players) {
      state.players = players
      state.playerPlayCounts = players.reduce((counts, player) => {
        counts[player.number] = 0
        return counts
      }, {})
    },
    updateCurrentPlay(state, playerNumber) {
      const index = state.currentPlay.indexOf(playerNumber)
      if (index > -1) {
        state.currentPlay.splice(index, 1)
      } else {
        state.currentPlay.push(playerNumber)
      }
    },
    savePlay(state) {
      state.playHistory.push([...state.currentPlay])
      state.currentPlay.forEach(playerNumber => {
        state.playerPlayCounts[playerNumber]++
      })
      state.currentPlay = []
    },
    updatePlayerPlayCount(state, { playerNumber, playCount }) {
      state.playerPlayCounts[playerNumber] = playCount
    }
  },
  actions: {
    initializeStore({ commit }) {
      const storedData = localStorage.getItem('teamData')
      if (storedData) {
        const { players, minPlays, playerPlayCounts } = JSON.parse(storedData)
        commit('setPlayers', players)
        commit('setMinPlays', minPlays)
        if (playerPlayCounts) {
          Object.entries(playerPlayCounts).forEach(([playerNumber, count]) => {
            commit('updatePlayerPlayCount', { playerNumber: parseInt(playerNumber), playCount: count })
          })
        }
      }
    },
    saveToLocalStorage({ state }) {
      localStorage.setItem('teamData', JSON.stringify({
        players: state.players,
        minPlays: state.minPlays,
        playerPlayCounts: state.playerPlayCounts
      }))
    }
  },
  getters: {
    playerPlayCount: (state) => (playerNumber) => {
      return state.playerPlayCounts[playerNumber] || 0
    }
  }
})