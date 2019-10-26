<template>
  <div>
    <b-navbar>
      <b-navbar-brand><h2>Dice Race</h2></b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <slot></slot>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style></style>
