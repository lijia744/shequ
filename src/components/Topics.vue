<template>
  <div class="topics" v-if="topics">
    <article>
      <div class="article-head">
        <div>
          <span class="tab active" v-if="topics.top||topics.good">{{topics.top?'置顶':'精华'}}</span>
          <h2>{{topics.title}}</h2>
          <span @click="changeCollect" v-if="isLogin" class="collect">{{!is_collect?'加入收藏':'取消收藏'}}</span>
        </div>
        <p style="font-size:12px">
          <span>
            <b>•</b>
            发布于{{myMoment(topics.create_at)}}
          </span>
          <span>
            <b>•</b>
            作者{{(topics.author.loginname)}}
          </span>
          <span>
            <b>•</b>
            {{topics.visit_count}}次浏览
          </span>
          <span>
            <b>•</b>
            来自{{topics.tab==="share"?'分享':topics.tab==="job"?'招聘':topics.tab==='ask'?'问答':'weex'}}
          </span>
        </p>
      </div>
      <div class="topic_content" v-html="topics.content"></div>
    </article>
    <div class="comment">
      <span>{{topics.replies.length}}回复</span>
      <ul class="comment-list">
        <li v-for="comment in topics.replies" :key="comment.id">
          <img :src="comment.author.avatar_url" alt />
          <div>
            <span class="loginname">{{comment.author.loginname}}</span>
            <span v-html="comment.content"></span>
          </div>
          <div class="ups">
            <span>
              <span @click="up(comment.id)">{{isUped(comment.id)?'👍':'赞'}}</span>
              {{comment.ups.length?comment.ups.length:''}}
            </span>
            <span @click="addreply(comment.author.loginname)">回复</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="addcomment">
      <span>添加回复</span>
      <form action>
        <textarea class="textarea" name id cols="30" rows="10" v-model="text"></textarea>
        <button @click="addComment">回复</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  name: "topics",
  data() {
    return {
      topics: null,
      is_collect: false,
      text: ""
    };
  },
  computed: {
    isLogin() {
      return Boolean(sessionStorage.getItem("token"));
    }
  },
  created() {
    const { id } = this.$route.params;
    axios.get(`https://www.vue-js.com/api/v1/topic/${id}`).then(res => {
      console.log(res.data);
      this.topics = res.data.data;
    });
  },
  methods: {
    myMoment(time) {
      moment.locale("zh-cn");
      return moment(time).fromNow();
    },
    changeCollect() {
      //改变是否收藏
      const obj = {
        topic_id: this.$route.params.id,
        accesstoken: sessionStorage.getItem("token")
      };
      if (this.is_collect) {
        axios
          .post(`https://www.vue-js.com/api/v1/topic/de_collect`, obj)
          .then(res => {
            if (res.data.success) {
              this.is_collect = false;
            }
          });
      } else {
        axios
          .post(`https://www.vue-js.com/api/v1/topic/collect`, obj)
          .then(res => {
            if (res.data.success) {
              this.is_collect = true;
            }
          });
      }
    },
    addComment() {
      axios.post(
        `https://www.vue-js.com/api/v1/topic/${this.topics.id}/replies`,
        {
          accesstoken: sessionStorage.getItem("token"),
          content: this.text
        }
      );
    },
    up(id) {
      if (sessionStorage.getItem("token")) {
        axios
          .post(`https://www.vue-js.com/api/v1/reply/${id}/ups`, {
            accesstoken: sessionStorage.getItem("token")
          })
          .then(res => {
            console.log(res.data);

            if (res.data.action === "up") {
              this.topics.replies
                .find(item => item.id === id)
                .ups.push(sessionStorage.getItem("user_id"));
            } else {
              this.topics.replies.find(
                item => item.id === id
              ).ups = this.topics.replies
                .find(item => item.id === id)
                .ups.filter(item => item != sessionStorage.getItem("user_id"));
            }
          });
      } else {
        alert("请登录");
      }
    },
    isUped(id) {
      console.log(this.topics.replies.find(item => item.id === id));

      return (
        this.topics.replies
          .find(item => item.id === id)
          .ups.indexOf(sessionStorage.getItem("user_id")) !== -1
      );
    },
    addreply(loginname) {
      this.text = `@${loginname}`;
      document.querySelector(".textarea").focus();
    }
  }
};
</script>

<style>
.topics article {
  background-color: #fff;
  border-radius: 3px;
}
.topics article .article-head {
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
}
.topics article .article-head > div {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.topics article .article-head > div h2 {
  margin: 0;
  flex-grow: 1;
}
.topics article .article-head > div .collect {
  background-color: #369219;
  color: #fff;
  font-size: 14px;
  padding: 3px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.topics .topic_content {
  padding: 10px;
  border-top: 1px solid #e5e5e5;
  margin-bottom: 20px;
}
.markdown-text {
  overflow: auto;
}
.markdown-text > :first-child,
.preview > :first-child {
  margin-top: 0;
}
.preview h1,
.preview h2,
.preview h3,
.preview h4,
.preview h5,
.preview h6,
.reply_area h1,
.reply_area h2,
.reply_area h3,
.reply_area h4,
.reply_area h5,
.reply_area h6,
.topic_content h1,
.topic_content h2,
.topic_content h3,
.topic_content h4,
.topic_content h5,
.topic_content h6 {
  margin: 30px 0 15px;
  border-bottom: 1px solid #eee;
}
.preview p,
.reply_content p,
.reply_form p,
.topic_content p {
  font-size: 15px;
  line-height: 1.7em;
  overflow: auto;
}
.markdown-text p,
.preview p {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  line-height: 2em;
  margin: 1em 0;
}
.topic_content img {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
  -ms-interpolation-mode: bicubic;
}
.comment {
  background-color: #fff;
  border-radius: 3px;
  margin-bottom: 20px;
  padding: 10px;
}
.comment > span {
  padding: 10px;
  display: block;
  color: #666;
  background-color: #c6c6c6;
  line-height: 30px;
  border-radius: 5px;
}
.comment .comment-list {
  padding: 0;
}
.comment .comment-list li {
  display: flex;
  padding: 10px;
  align-items: flex-start;
}
.comment .comment-list li img {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
.comment .comment-list li > div {
  display: flex;
  flex-direction: column;
}
.comment .comment-list li > div .loginname {
  font-size: 12px;
  color: #666;
}
.comment .comment-list li > .ups {
  flex-grow: 1;
  text-align: right;
}
.addcomment {
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
}
.addcomment > span {
  padding: 0 10px;
  display: block;
  margin-bottom: 10px;
  color: #1c6132;
  font-size: 14px;
  background-color: #6ba44e;
  line-height: 30px;
  border-radius: 5px;
}
.addcomment textarea {
  resize: none;
  outline: none;
  border-color: #666;
  width: 100%;
}
.addcomment button {
  display: block;
  outline: none;
  border: 0;
  background-color: rgb(16, 105, 165);
  color: #fff;
  line-height: 30px;
  width: 80px;
  border-radius: 8px;
}
</style>
