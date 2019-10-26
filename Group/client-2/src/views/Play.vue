<template>
  <div class="container">
    <div class="position" v-for="(player, index) in allplayer" :key="index">
      <div class="player">
        <div
          v-if="player.name === 'b'"
          :style="'margin-left:' + player.posisi + '%;'"
        >
          1
        </div>
        <div
          v-else-if="player.name !== 'b'"
          :style="'margin-left:' + player.posisi + '%;'"
        >
          2
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-primary" @click="random">click me</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
  name: "play",
  data() {
    return {
      socket: io.connect("http://localhost:3000"),
      allplayer: [],
      id: ""
      // posisi: 0
    };
  },
  methods: {
    random() {
      let rand = Math.ceil(Math.random() * Math.floor(20));
      if (this.allplayer[0].posisi + rand >= 100) {
        this.allplayer[0].posisi = 100;
        this.socket.emit("sendData", this.allplayer[0].posisi);
        alert("menangg");
        this.allplayer[0].posisi = 0;
        this.socket.emit("sendData", this.allplayer[0].posisi);
      } else {
        this.allplayer[0].posisi += rand;
      }
      // this.posisi += rand;
      // axios({
      //   method: "patch",
      //   url: "http://localhost:3000/user/5da889c91c9d440000e384fb",
      //   data: {
      //     posisi: this.allplayer[0].posisi
      //   }
      // });
      this.socket.emit("sendData", this.allplayer[0].posisi);
    },
    getdata() {
      axios({
        method: "get",
        url: "http://localhost:3000/user"
      });
    }
  },
  created() {
    this.getdata();
    this.socket.on("datauser", payload => {
      this.allplayer = payload;
      // console.log(this.allplayer, "masuk di emit");
    });
  }
};
</script>

<style>
.position {
  border: 2px solid black;
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: row;
}
.player {
  border: 2px solid black;
  text-align: left;
  width: 100%;
  height: 50%;
}
</style>
