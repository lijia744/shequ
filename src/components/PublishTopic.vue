<template>
  <div class="bgc">
    <div class="header">
      <ul class="breadcrumb">
        <li>
          <a href="http://localhost:8080/shequ/">主页</a>
          <span class="divider">/</span>
        </li>
        <li class="active">发布话题</li>
      </ul>
    </div>
    <div class="inner post">
      <span class="tab-selector">选择板块：</span>

      <select name id v-model="tab">
        <option value>请选择</option>
        <option value="job">招聘</option>
        <option value="share">分享</option>
        <option value="ask">问答</option>
      </select>
      <br />
      <input type="text" v-model="title" placeholder="标题字数 10 字以上" />
      <!-- bidirectional data binding（双向数据绑定） -->
      <!-- :options="editorOption" -->
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>

      <!-- Or manually control the data synchronization（或手动控制数据流） -->
      <!-- <quill-editor
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    >
      </quill-editor>-->
      <button @click="publish">发布</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "publish",
  components: {
    quillEditor
  },
  data() {
    return {
      title: "",
      content: "",
      tab: "",
      editorOption: {
        // 富文本
      }
    };
  },
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      // 当富文本编辑器输入内容的话  同步修改 自己data中的content的变化
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    publish() {
      console.log(this.title.length);

      // const { id } = this.$route.params;
      if (this.title.length > 10) {
        axios
          .post("https://www.vue-js.com/api/v1/topics", {
            title: this.title,
            content: this.content,
            tab: this.tab,
            accesstoken: sessionStorage.getItem("token")
          })
          .then(res => {
            console.log(res.data);
            this.$router.push(`/shequ/topic/${res.data.topic_id}`);
          });
      } else {
        alert("标题至少为十个字符");
      }
    }
  }
};
</script>

<style>
/* .bgc {
  background-color: #fff;
} */
.bgc .header {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.bgc .header ul {
  padding-left: 0;
  margin: 0;
  display: flex;
  font-size: 14px;
}
.breadcrumb > li > .divider {
  padding: 0 5px;
  color: #ccc;
}
.breadcrumb a {
  color: #369219;
}
.breadcrumb a:hover {
  text-decoration: underline;
}
.breadcrumb > .active {
  color: #999;
}
.bgc .inner {
  background-color: #fff;
}
.bgc .inner.post {
  padding: 10px;
  border-top: 1px solid #e5e5e5;
}
.bgc .inner.post .tab-selector {
  font-size: 14px;
}
.bgc select {
  width: 220px;
  line-height: 30px;
  padding: 4px 6px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
  vertical-align: middle;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #ccc;
}
.bgc input {
  width: 98%;
  border: 0;
  margin-bottom: 1em;
  resize: none;
  box-shadow: 0 0 2px rgba(60, 60, 60, 0.5);
  padding: 4px 6px;
  line-height: 20px;
  color: #555;
  vertical-align: middle;
  border-radius: 4px;
}
.bgc button {
  display: inline-block;
  float: none;
  padding: 3px 10px;
  border: 0;
  margin: 0;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  letter-spacing: 2px;
  box-shadow: none;
  border-radius: 3px;
  line-height: 2em;
  vertical-align: middle;
  color: #fff;
  background-color: #3374de;
  margin-top: 20px;
}
.bgc button:hover {
  color: #fff;
  background-color: #05c;
}
.ql-editor {
  height: 450px;
}
</style>
