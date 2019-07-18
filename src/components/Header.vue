<template>
  <div class="header">
    <div class="top-wrap">
      <router-link to="/shequ/">
        <div class="logo">
          <img src="https://www.vue-js.com/public/images/vue.png" alt />
          <p class="logo-txt">vue.js</p>
        </div>
      </router-link>
      <ul class="header-nav">
        <li class="first-page">
          <router-link v-if="userInfo" to="/shequ/">首页</router-link>
        </li>
        <li>
          <router-link v-if="userInfo" :to="!userInfo?'/shequ/':'/shequ/my/message'">
            <span>{{messageNum==0?'':messageNum}}</span> 未读消息
          </router-link>
        </li>
      </ul>

      <div class="user-login">
        <div v-if="!userInfo" class="login">
          <input type="text" v-model="text" />
          <router-link to="/shequ/">
            <button @click="login">登录</button>
          </router-link>
        </div>
        <div v-else class="logout">
          <router-link v-if="userInfo" :to="`/shequ/topics/create`">
            <button v-if="$route.fullPath.indexOf('create')==-1" class="publish-topic">发布话题</button>
          </router-link>
          <img :src="userInfo.avatar_url" alt />
          <router-link to="/shequ/">
            <button @click="logout">退出</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "hea",
  components: {},
  data() {
    return {
      userInfo: null,
      text: "19e0420c-12d3-44fd-b7fa-70eae164c2ea",
      messageNum: ""
    };
  },
  watch: {
    "$route.fullPath": {
      immediate: true,
      handler() {
        axios
          .get(
            `https://www.vue-js.com/api/v1/message/count?accesstoken=${sessionStorage.getItem(
              "token"
            )}`
          )
          .then(res => {
            console.log(res.data.data);
            this.messageNum = res.data.data;
          });
      }
    }
  },
  created() {
    if (sessionStorage.getItem("token")) {
      axios
        .post("https://www.vue-js.com/api/v1/accesstoken", {
          accesstoken: sessionStorage.getItem("token")
        })
        .then(res => {
          this.userInfo = res.data;
          console.log(this.userInfo);
        });
      axios
        .get(
          `https://www.vue-js.com/api/v1/message/count?accesstoken=${sessionStorage.getItem(
            "token"
          )}`
        )
        .then(res => {
          console.log(res.data.data);
          this.messageNum = res.data.data;
        });
    }
  },
  methods: {
    login() {
      axios
        .post("https://www.vue-js.com/api/v1/accesstoken", {
          accesstoken: this.text
        })
        .then(res => {
          this.userInfo = res.data;
          // console.log(res.data.id);

          sessionStorage.setItem("token", this.text); //在浏览器里存储
          sessionStorage.setItem("user_id", this.userInfo.id);
        });
      // console.log(this.userInfo);
    },
    logout() {
      this.userInfo = null;
      sessionStorage.clear();
      // sessionStorage.removeItem("token");
    }
  }
};
</script>

<style>
.header {
  background-color: #1c6132;
}
.header .top-wrap {
  height: 55px;
  width: 85%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 15px;
  align-items: center;
}
.header .top-wrap a {
  display: flex;
  flex-grow: 1;
  color: #eee;
  transition: all 0.2s;
}
.header .top-wrap a:hover {
  color: #fff;
}
.user-login .publish-topic {
  outline: none;
  border: 0;
  background-color: #1c6132;
  color: #eee;
  line-height: 30px;
  transition: all 0.2s;
  flex-shrink: 0;
  padding: 0;
}
.user-login .publish-topic:hover {
  color: #fff;
}
.header {
  flex-grow: 1;
}
.header .logo {
  display: flex;
  align-items: center;
}
.header .logo img {
  width: 45px;
  height: 45px;
}
.header .logo .logo-txt {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}
.header .header-nav {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  flex-shrink: 0;
}
.header .header-nav li {
  cursor: pointer;
  flex-shrink: 0;
}
.header .header-nav .first-page {
  margin-right: 20px;
}
.user-login .logout img {
  width: 45px;
  margin-left: 20px;
}
.header .top-wrap .user-login .login,
.header .top-wrap .user-login .logout {
  display: flex;
  align-items: center;
  /* flex-grow: 1; */
  /* justify-content: flex-end; */
}
.header .top-wrap .user-login .login input {
  outline: none;
  line-height: 30px;
  border: none;
}
.user-login button {
  outline: none;
  border: 0;
  padding: 0;
  background-color: #1c6132;
  color: #eee;
  line-height: 30px;
  margin: 0 0 0 20px;
  transition: all 0.2s;
}
.user-login button:hover {
  color: #fff;
}
</style>
