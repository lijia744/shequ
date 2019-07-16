<template>
  <div v-if="userObj" class="user">
    <div class="user-top">
      <router-link to="/shequ/">主页/</router-link>
      <div>
        <img :src="userObj.avatar_url" alt />
        <span>{{userObj.loginname}}</span>
      </div>
      <p>{{userObj.score+' '+'积分'}}</p>
      <span>{{'注册时间'+' '+ myTime(userObj.create_at)}}</span>
    </div>
    <div class="user-topic">
      <h3>最近创建的话题</h3>
      <ul>
        <li v-for="user in userObj.recent_topics" :key="user.id">
          <router-link :to="`/shequ/user/${user.author.loginname}`">
            <img :src="user.author.avatar_url" alt />
          </router-link>
          <div></div>
          <router-link :to="'/shequ/topic/'+user.id">{{user.title}}</router-link>
          <span>{{myTime(user.last_reply_at)}}</span>
        </li>
        <li>查看更多》</li>
      </ul>
    </div>
    <div class="other-user user-topic">
      <h3>最近参与的话题</h3>
      <ul>
        <li v-for="user in userObj.recent_replies" :key="user.id">
          <router-link :to="`/shequ/user/${user.author.loginname}`">
            <img :src="user.author.avatar_url" alt />
          </router-link>
          <div></div>
          <router-link :to="'/shequ/topic/'+user.id">{{user.title}}</router-link>
          <span>{{myTime(user.last_reply_at)}}</span>
        </li>
        <li>查看更多》</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "user",
  data() {
    return {
      userObj: null
    };
  },
  watch: {
    "$route.fullPath": {
      immediate: true,
      handler() {
        axios
          .get(
            `https://www.vue-js.com/api/v1/user/${this.$route.params.loginname}`
          )
          .then(res => {
            this.userObj = res.data.data;
            console.log(this.userObj);
          });
      }
    }
  },
  created() {
    axios
      .get(`https://www.vue-js.com/api/v1/user/${this.$route.params.loginname}`)
      .then(res => {
        this.userObj = res.data.data;
        console.log(this.userObj);
      });
    // const { id } = this.$route.params;
    // axios
    //   .get(
    //     `https://www.vue-js.com/api/v1/topic/${this.userObj.recent_topics.id}`
    //   )
    //   .then(res => {
    //     // console.log(res.data);
    //   });
  },
  methods: {
    myTime(time) {
      moment.locale("zh-cn");
      return moment(time).fromNow();
    }
  }
};
</script>

<style>
.user .user-top {
  background-color: #fff;

  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.user .user-top > a {
  color: rgb(59, 172, 25);
  padding: 10px;
  border-bottom: 1px solid #bbb;
}
.user .user-top > div {
  display: flex;
  align-items: flex-start;
  color: #778087;
  padding: 10px;
}
.user .user-top > div > img {
  border-radius: 5px;
  margin-right: 10px;
  width: 40px;
  height: 40px;
}
.user .user-top > p {
  color: #333;
}
.user .user-top > span {
  color: #ababab;
}
.user .user-top > p,
.user .user-top > span {
  line-height: 28px;
  margin: 0 0 10px;
  padding: 0 10px;
}
.user .user-topic h3 {
  color: #1c6132;
  font-size: 14px;
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  margin-bottom: 0;
  border-bottom: 1px solid #ccc;
}
.user .user-topic > ul {
  background-color: #fff;
  margin: 0;
  padding-left: 0;
}
.user .user-topic > ul li {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  align-items: center;
}
.user .user-topic > ul li:last-child {
  border: 0;
  color: #778087;
}
.user .user-topic > ul > li > a > img {
  border-radius: 5px;
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
.user .user-topic > ul > li > a {
  color: #08c;
  font-size: 16px;
}
.user .user-topic > ul > li > a:hover {
  text-decoration: underline;
}
.user .user-topic > ul > li > span {
  flex-grow: 1;
  text-align: right;
  font-size: 12px;
  color: #777;
}
.user .other-user {
  margin-bottom: 30px;
}
</style>
