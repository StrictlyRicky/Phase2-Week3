<template>
  <div class="container">
    <b-card>
      <b-card-text>
        <b-form @submit.prevent="login">
          <b-form-group>
            <h4>Name:</h4>
            <b-form-input
              v-model="name"
              type="text"
              required
              placeholder="Enter Your Name"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    login() {
      this.$store.commit("login", this.name);
      axios({
        method: "post",
        url: "http://34.87.63.92/user/register",
        data: { username: this.name }
      }).then(({ data }) => {
        this.$router.push("/room");
        this.$store.commit("login", data);
      });
    }
  }
};
</script>

<style scoped>
div {
  margin-top: 10%;
}
input {
  width: 25vw;
  margin: auto;
}
.card {
  background-color: #eaeaea;
  height: 30vh !important;
  width: 50vw;
  margin-left: 10%;
  justify-content: center !important;
}
</style>
