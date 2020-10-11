<template>
  <div>
    <el-card>
      <Editor
          id="myTabEditor"
          ref="myTabEditor"
      />
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-button-group>
          <el-button type="primary" @click="submitForm()">Submit</el-button>
          <el-button @click="goHome()">Cancel</el-button>
        </el-button-group>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import axios from "axios";
  import Editor from '@/components/TextEditor'
  import utils from "../common/utils";
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
    mounted() {
      const id = this.$route.params.tabId
      this.tabId = id
      console.log("tab: "+this.tabId)
      // const _this = this
      //取得富文本编辑器对象
      const editor = this.$refs.myTabEditor
      console.log(editor)
      //页面填值
      //加载更新前的数据
      utils.readTabContent(id).then(res => {
        const data = res
        console.log(data)
        //页面填值
        this.tabTitle = data.title
        this.tabContent = data.content
        editor.content = data.content
      })

      // axios.get('/tab/'+_this.tabId).then(res => {
      //   //取得数据源
      //   const editor = this.$refs.contentEditor
      //
      //   console.log(editor)
      //   console.log(res)
      //   const data = res.data.data;
      //   console.log(data)
      //
      //   //页面填值
      //   _this.tabTitle = data.title
      //   //编辑器内容
      //   _this.tabContent = data.content
      //   editor.content = data.content
      //   // console.log(form)
      // })
    },
    methods: {
      submitForm() {
        // console.log(this.$refs.detailsEditor.content)
        const _this = this
        //数据源
        const editor = this.$refs.myTabEditor
        //获取数据
        _this.content = editor.content
        console.log("send:" + JSON.stringify(_this.content))

        return axios.post('/tab/' + _this.tabId, {title: _this.title, content: _this.content}).then(res => {
          sessionStorage.removeItem("tab"+_this.tabId)
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