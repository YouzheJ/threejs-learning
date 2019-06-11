<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
$theme-color: #42b983;

html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
* {
    box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  font-size: 16px;
  width: 100%;
  height: 100%;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: $theme-color;
}
</style>
