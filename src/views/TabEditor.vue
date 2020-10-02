<template>
  <div>
    <Editor
        ref="contentEditor"
    />
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
  }
</script>

<style scoped>

</style>