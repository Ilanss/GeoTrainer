<template>
    <v-app>

      <!--<v-app-bar app>
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/settings">Settings</router-link> |
          <router-link to="/game">Play</router-link> |
          <router-link to="/about">About</router-link>
        </div>
      </v-app-bar>-->
      <v-main>
          <router-view/>
      </v-main>


  </v-app>
</template>

<style>
  #app {
    text-align: center;
    color: #2c3e50;
  }
  *,*:focus,*:hover{
    outline:none;
  }
</style>