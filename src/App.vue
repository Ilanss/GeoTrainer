<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/game">Play</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a {
  color: #42b983;
}
button{
  padding: 10px 30px;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  margin-top: 20px;
}
button:hover {
  filter: brightness(90%);
}
*,*:focus,*:hover{
  outline:none;
}
</style>
