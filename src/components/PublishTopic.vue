<template>
  <div class="bgc">
    <span>请选择：</span>
    <select
      name=""
      id=""
      v-model="tab"
    >
      <option value="">请选择</option>
      <option value="job">招聘</option>
      <option value="share">分享</option>
      <option value="ask">问答</option>
    </select>
    <input
      type="text"
      v-model="title"
    >
    <!-- bidirectional data binding（双向数据绑定） -->
    <!-- :options="editorOption" -->
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    >
    </quill-editor>

    <!-- Or manually control the data synchronization（或手动控制数据流） -->
    <!-- <quill-editor
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    >
    </quill-editor> -->
    <button @click="publish">发布</button>
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
.bgc {
  background-color: #fff;
}
.ql-editor {
  height: 200px;
}
</style>
