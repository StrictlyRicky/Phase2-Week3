<template>
  <div id="app">
    <router-view
      :currentSlide="currentSlide"
      @requestChangeSlide="changeSlide"
    />
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: io.connect("http://localhost:3000"),
      currentSlide: {}
    };
  },
  methods: {
    changeSlide(id) {
      this.socket.emit("set slide", id);
    }
  },
  created() {
    this.socket.on("replace slide", data => {
      this.currentSlide = data;
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
</style>
