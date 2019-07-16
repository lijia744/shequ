<template>
  <div
    v-if="messages"
    class="user"
  >
    <div class="user-top mb-20">
      <router-link to='/shequ/'> 主页/</router-link>

      <div class="user-topic">
        <ul>
          <li
            v-for="message in messages.hasnot_read_messages"
            :key="message.id"
          >

            <div></div>
            <router-link :to="'/shequ/user/'+message.author.loginname">{{message.author.loginname}}</router-link>
            <span>{{message.type==='at'?"在话题":'回复了你的话题'}}</span>
            <router-link :to="'/shequ/topic/'+message.topic.id">{{message.topic.title}}</router-link><span v-if="message.type==='at'">中@到了你</span>
            <!-- <span>{{myTime(message.last_reply_at)}}</span> -->
          </li>

        </ul>
      </div>

    </div>
    <div class="user-top">
      <h4>过往消息</h4>
      <div class="user-topic">
        <ul>
          <li
            v-for="message in messages.has_read_messages"
            :key="message.id"
          >
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
.user .mb-20 {
  margin-bottom: 20px;
}
.user-top > h4 {
  color: rgb(59, 172, 25);
  padding: 10px;
  border-bottom: 1px solid #bbb;
  margin: 0;
  font-weight: normal;
}
</style>
