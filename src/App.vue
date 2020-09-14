<template>
  <div id="app">
      <div class="logo">
          <img alt="Vue logo" src="./assets/eLogo.png">
      </div>
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>



</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
.logo{
    position: relative;
    margin: 0px 54px;
}
</style>
