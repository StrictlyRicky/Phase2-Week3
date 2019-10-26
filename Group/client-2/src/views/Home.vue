<template>
  <div>
    <Navbar></Navbar>
    <Login />
  </div>
</template>

<script>
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
export default {
  name: "home",
  components: {
    Login,
    Navbar
  }
};
</script>
