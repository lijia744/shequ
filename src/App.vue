<template>
  <div class="app">
    <Header />
    <div class="box">
      <!-- <div class="wrap"> -->
      <!-- <div class="banner">
          <img
            src="http://static.vue-js.com/FrhMYPI63ONaHPlhPFB1LhTGPxN4"
            alt=""
          >
      </div>-->
      <router-view></router-view>

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./components/Header";
export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style>
body {
  background-color: #e5e5e5;
}

.box {
  width: 85%;
  margin: 0 auto;
}
/* .wrap {
  width: 80%;
  flex-shrink: 0;
} */
.banner {
  padding: 10px 0;
}
.banner img {
  width: 100%;
}
</style>
