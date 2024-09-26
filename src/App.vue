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
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --background-color: #ecf0f1;
  --text-color: #34495e;
  --border-color: #bdc3c7;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
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
  font-size: 1.5rem;
}

nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
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
  background-color: rgba(255, 255, 255, 0.2);
}

main {
  flex-grow: 1;
  padding: 1rem;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
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
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #27ae60;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
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

@media (max-width: 768px) {
  header h1 {
    font-size: 1.2rem;
  }

  nav a {
    padding: 0.3rem 0.7rem;
    font-size: 0.9rem;
  }

  main {
    padding: 0.5rem;
  }

  table {
    font-size: 0.9rem;
  }

  th, td {
    padding: 0.3rem;
  }
}
</style>