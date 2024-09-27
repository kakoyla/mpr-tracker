<template>
  <div id="app">
    <header>
      <h1>MPR Tracker</h1>
      <nav>
        <router-link to="/">Setup</router-link>
        <router-link to="/tracking">Player Tracking</router-link>
        <router-link to="/team-mpr">Team MPR</router-link>
      </nav>
    </header>
    <main>
      <router-view @save-data="saveData"></router-view>
    </main>
    <footer>
      <p>&copy; 2024 MPR Tracker App</p>
    </footer>
  </div>
</template>

<script>
import { onMounted, provide } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const router = useRouter()

    onMounted(() => {
      store.dispatch('initializeStore')
    })

    const saveData = () => {
      store.dispatch('saveToLocalStorage')
    }

    provide('saveData', saveData)

    router.afterEach(() => {
      saveData()
    })

    return {
      saveData
    }
  }
}
</script>

<style>
:root {
  --primary-color: #3a506b;
  --secondary-color: #5bc0be;
  --background-color: #f0f5f9;
  --text-color: #1c2541;
  --border-color: #c9d6df;
  --active-color: #0b132b;
  --error-color: #d64545;
  --success-color: #3ebd93;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  padding: 1rem;
}

header h1 {
  margin-bottom: 1rem;
}

nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover,
nav a.router-link-active {
  background-color: var(--active-color);
}

main {
  flex-grow: 1;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

button {
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4ca8a6;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: white;
}

th, td {
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: var(--primary-color);
  color: white;
}

.error {
  color: var(--error-color);
}

.success {
  color: var(--success-color);
}
</style>