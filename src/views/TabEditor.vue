<template>
  <div>
    <Editor
        ref="contentEditor"
    />
    <el-button type="primary" @click="submitForm()">Submit</el-button>
    <el-button @click="goHome()">Cancel</el-button>
  </div>
</template>

<script>
  import axios from "axios";
  import Editor from '@/components/TextEditor'
  export default {
    name: "TabEditor",
    components: {
      Editor
    },
    data() {
      return {
        tabTitle: '',
        tabId: '',
        tabContent: '',
      }
    },
    created() {
      this.tabId = this.$route.params.tabId
      console.log("tab: "+this.tabId)
      const _this = this
      //加载更新前的数据
      return axios.get('/tab/'+_this.tabId).then(res => {
        //取得数据源
        const editor = this.$refs.contentEditor

        console.log(editor)
        console.log(res)
        const data = res.data.data;
        console.log(data)

        //页面填值
        _this.tabTitle = data.title
        //编辑器内容
        _this.tabContent = data.content
        editor.content = data.content
        // console.log(form)
      })
    },
    methods: {
      submitForm() {
        // console.log(this.$refs.detailsEditor.content)
        const _this = this
        //数据源
        const editor = this.$refs.contentEditor
        //获取数据
        _this.content = editor.content
        console.log("send:" + JSON.stringify(_this.content))

        return axios.post('/tab/' + _this.tabId, {title: _this.title, content: _this.content}).then(res => {
          console.log(res)
          this.goHome()
        })
      },
      goHome() {
        this.$router.push("/Home");
      },
    }
  }
</script>

<style scoped>

</style>