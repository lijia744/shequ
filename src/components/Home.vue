<template>
  <div class="home">
    <ul class="nav">
      <li>
        <router-link
          @click.native="total=856"
          :class="$route.fullPath==='/shequ/'||$route.fullPath.indexOf('/shequ/?tab=all')!=-1? 'active':''"
          to="/shequ/?tab=all"
        >全部</router-link>
      </li>
      <li>
        <router-link
          @click.native="total=15"
          :class="$route.fullPath.indexOf('/shequ/?tab=good')!=-1? 'active':''"
          to="/shequ/?tab=good"
        >精华</router-link>
      </li>
      <li>
        <router-link
          @click.native="total=3"
          :class="$route.fullPath.indexOf('/shequ/?tab=weex')!=-1? 'active':''"
          to="/shequ/?tab=weex"
        >weex</router-link>
      </li>
      <li>
        <router-link
          @click.native="total=247"
          :class="$route.fullPath.indexOf('/shequ/?tab=share')!=-1? 'active':''"
          to="/shequ/?tab=share"
        >分享</router-link>
      </li>
      <li>
        <router-link
          @click.native="total=577"
          :class="$route.fullPath.indexOf('/shequ/?tab=ask')!=-1? 'active':''"
          to="/shequ/?tab=ask"
        >问答</router-link>
      </li>
      <li>
        <router-link
          @click.native="total=30"
          :class="$route.fullPath.indexOf('/shequ/?tab=job')!=-1? 'active':''"
          to="/shequ/?tab=job"
        >招聘</router-link>
      </li>
    </ul>
    <div class="content">
      <ul v-if="topics.length" class="main">
        <li v-for="topic in topics" :key="topic.id">
          <router-link :to="`/shequ/user/${topic.author.loginname}`">
            <img style="width:30px;height:30px" :src="topic.author.avatar_url" alt />
          </router-link>
          <div class="count">
            <span>{{topic.reply_count}}</span>/
            <span>{{topic.visit_count}}</span>
          </div>
          <span
            v-if="$route.fullPath==='/shequ/'||$route.fullPath==='/shequ/?tab=all'||topic.top||topic.good"
            :class="{'tab':true,'active':topic.top||topic.good}"
          >{{topic.top?'置顶':topic.good?'精华':topic.tab==='ask'?'问答':topic.tab==='job'?'招聘':topic.tab==='share'?'分享':'weex'}}</span>
          <router-link :to="'/shequ/topic/'+topic.id">{{topic.title}}</router-link>
          <span class="time">{{myMoment(topic.last_reply_at)}}</span>
        </li>
      </ul>
      <img
        style="width:100%"
        v-else
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562752382072&di=d3633635b4c61519fd33d75d704df720&imgtype=0&src=http%3A%2F%2Fimg.zhisheji.com%2Fbbs%2Fforum%2F201705%2F03%2F103018wu707lkqwwzcy4ow.gif"
        alt
      />
      <el-pagination
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "home",
  data() {
    return {
      topics: [],
      total: 856
    };
  },
  watch: {
    "$route.fullPath": {
      immediate: true,
      handler() {
        const tab = this.$route.query.tab || "all";
        const num = this.$route.query.page || 1;
        this.topics = [];
        axios
          .get(`https://www.vue-js.com/api/v1/topics?tab=${tab}&page=${num}`)
          .then(res => {
            this.topics = res.data.data;
            // console.log(this.topics);
          });
      }
    }
  },
  methods: {
    myMoment(time) {
      moment.locale("zh-cn");
      return moment(time).fromNow();
    },
    changePage(num) {
      console.log(111);

      const tab = this.$route.query.tab || "all";
      this.$router.push(`/shequ/?tab=${tab}&page=${num}`);
      console.log(num);
    }
  }
};
</script>

<style>
/* .home{
  background-color: #fff;
} */
.home .nav {
  display: flex;
  padding: 10px 0;
  margin: 0;
  background-color: #f6f6f6;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.home .nav li {
  margin: 0 10px;
}
.home .nav li a {
  color: #369219;
  font-size: 14px;
  padding: 3px 4px;
}
.home .nav li .active {
  width: 36px;
  background-color: #369219;
  color: #fff;
  border-radius: 3px;
}
.content {
  background-color: #fff;
}
.content > ul {
  padding: 0;
  margin: 0;
}
.content > ul > li {
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}
.content > ul > li:hover {
  background: #f6f6f6;
}
.content > ul > li a {
  font-size: 14px;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content > ul > li a:hover {
  text-decoration: underline;
}
.tab {
  flex-shrink: 0;
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e5e5e5;
  font-size: 12px;
  height: 20px;
  color: #999;
  margin-right: 5px;
}
.tab.active {
  color: #fff;
  background-color: #369219;
}
.content > ul > li > img,
.content > ul > li .count {
  flex-shrink: 0;
}

.content > ul > li .count {
  font-size: 12px;
  color: #b4b4b4;
  width: 100px;
  text-align: center;
}
.content > ul > li .time {
  flex-grow: 1;
  text-align: end;
  flex-shrink: 0;
}
/* .content .el-pagination .el-pager .number {
  width: 20px;
}
.content .el-pagination .el-pager {
  display: flex;
} */
</style>
