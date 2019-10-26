<template>
  <div>
    <!-- <iframe src="../assets/dejavu.mp3" allow="autoplay" style="display:none" id="iframeAudio">
  </iframe>  -->
    <audio controls autoplay>
      <source src="../assets/dejavu.mp3" allow="autoplay" type="audio/mp3" />
    </audio>
    <div class="container mt-5">
      <label class="h2">Let the race begin!!!</label>
      <div v-for="(player, index) in players" :key="index">
        <h4>{{ player.username }}</h4>
        <b-form-input
          class="p-5"
          v-model="player.posisi"
          type="range"
          min="0"
          max="50"
          step="1"
          disabled
        ></b-form-input>
      </div>
    </div>
    <div>
      <div>Countdown : {{ diceCount }}</div>
      <br /><br />
      <form>
        <div>
          <div id="one">
            <img :src="pic" />
          </div>
        </div>
        <b-button @click.prevent="roll()">Roll</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import io from "socket.io-client";

export default {
  name: "game",
  data() {
    return {
      players: [],
      isRoll: false,
      object: null,
      diceCount: 0,
      numberOfRolls: 0,
      result: 0,
      myVar: null,
      socket: io.connect("http://34.87.63.92"),
      pic:
        "https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_black_6-512.png"
    };
  },
  methods: {
    roll() {
      // console.log("rolling");
      // const numberOfRolls = this.numberOfRolls
      this.rollDice(2);
    },
    rollDice(numberOfRolls) {
      this.isRoll = true;

      // var diceThrow = Math.floor((Math.random() * 6) + 1);

      const dicePics1 = [
        "https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_black_1-512.png",
        "https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_black_6-512.png",
        "https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_black_2-512.png",
        "https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_black_4-512.png",
        "https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_black_5-512.png",
        "https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_black_3-512.png"
      ];
      let randomDice = Math.floor(Math.random() * dicePics1.length);

      this.pic = dicePics1[randomDice];

      this.diceCount = numberOfRolls;

      this.result = randomDice + 1;
      --numberOfRolls;
      // Check if there is a throw left...
      if (numberOfRolls < 0) {
        setTimeout(() => {
          this.isRoll = false;
          // this.$store.state.r.$store.state.diceoom.players[0].position += this.result
          // this.$store.state.dice.result = this.result;
          // this.car1 += this.result;
          this.socket.emit("updatePosition", {
            token: this.$store.state.token,
            posisi: this.result,
            roomid: this.$store.state.room._id
          });
          this.numberOfRolls = 0;
        }, 500);
        return;
      }
      // this.tap();
      setTimeout(() => {
        this.rollDice(numberOfRolls);
      }, 500);
    },
    tap(name) {
      // this.car1 += Math.floor(Math.random() * 6);
      Swal.fire("Congrats!!", `${name} Won!!`, "success");
    },
    fetchUser() {
      this.socket.emit("fetchUser", this.$store.state.room._id);
    }
  },
  mounted() {
    this.$store.state.username ? this.fetchUser() : this.$router.push("/");
    this.socket.on("returnedFetch", payload => {
      this.players = payload;
      this.players.forEach(player => {
        if (player.posisi >= 50) {
          this.tap(player.username);
          this.socket.emit("updateWin", this.$store.state.room._id)
        }
      });
    });
  }
};
</script>

<style>
img {
  height: 250px;
  width: 250px;
}
</style>
