<template>
  <div v-if="messages" class="user">
    <div class="user-top mb-20">
      <div class="header">
        <ul class="breadcrumb">
          <li>
            <a href="http://localhost:8080/shequ/">主页</a>
            <span class="divider">/</span>
          </li>
          <li class="active">新消息</li>
        </ul>
      </div>
      <div class="user-topic">
        <p v-if="! messages.hasnot_read_messages.length">无消息</p>
        <ul>
          <li v-for="message in messages.hasnot_read_messages" :key="message.id">
            <div></div>
            <router-link :to="'/shequ/user/'+message.author.loginname">{{message.author.loginname}}</router-link>
            <span>{{message.type==='at'?"在话题":'回复了你的话题'}}</span>
            <router-link :to="'/shequ/topic/'+message.topic.id">{{message.topic.title}}</router-link>
            <span v-if="message.type==='at'">中@到了你</span>
            <!-- <span>{{myTime(message.last_reply_at)}}</span> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="user-top">
      <h4>过往消息</h4>
      <div class="user-topic">
        <p v-if="!messages.has_read_messages.length">无消息</p>
        <ul>
          <li v-for="message in messages.has_read_messages" :key="message.id">
            <div></div>
            <router-link :to="'/shequ/user/'+message.author.loginname">{{message.author.loginname}}</router-link>回复了你
            <router-link :to="'/shequ/topic/'+message.topic.id">{{message.topic.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "message",
  data() {
    return {
      messages: null
    };
  },
  // watch: {
  //   "$route.fullPath": {
  //     immediate: true,

  //     handler() {}
  //   }
  // },
  created() {
    console.log(this.$route.params);
    axios
      .get(
        `https://www.vue-js.com/api/v1/messages?accesstoken=${sessionStorage.getItem(
          "token"
        )}`
      )
      .then(res => {
        console.log(res.data.data);
        this.messages = res.data.data;
      });
  },
  watch: {
    "$route.fullPath": {
      immediate: true,

      handler() {
        axios
          .post("https://www.vue-js.com/api/v1/message/mark_all", {
            accesstoken: sessionStorage.getItem("token")
          })
          .then(res => {
            console.log(res.data.data);
            this.messages = res.data.data;
          });
      }
    }
  }
};
</script>

<style>
.user .header {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.user .header ul {
  padding-left: 0;
  margin: 0;
  display: flex;
  font-size: 14px;
}
.user .mb-20 {
  margin-bottom: 20px;
}
.user-top > h4 {
  color: #1c6132;
  padding: 10px;
  background-color: #f6f6f6;
  margin: 0;
  font-weight: normal;
}
</style>
