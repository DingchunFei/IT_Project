<template>
  <div>
    <el-card>
      <div v-html="tabContent"/>
    </el-card>

    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        router
    >
      <el-menu-item @click="updateTab()"><i class="el-icon-edit"></i></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  // import axios from "axios";
  import utils from "../common/utils";
  export default {
    name: "Tab",
    props : {
      tabId: String,
      tabTitle: String,
    },
    data(){
      return {
        tabContent: '',
      }
    },
    created() {
      this.readTabContent()
    },
    methods: {
      //通过tab id获取tab内容
      readTabContent(){
        const id = this.tabId
        //使用公用方法
        utils.readTabContent(id).then(res => {
          const data = res
          console.log(data)
          this.tabContent = data.content
        })
        // axios.get('/tab/'+id).then(res => {
        //   const data = res.data.data
        //   this.tabContent = data.content
        //   sessionStorage.setItem("tab"+id, data)
        //   console.log(data)
        // })
      },
      //进入修改页面
      updateTab(){
        const _this = this
        this.$router.push({
          name: 'TabEditor',
          params: {
            tabId: _this.tabId
          }
        })
        console.log("update this tab")
      },
    }
  }
</script>

<style scoped>

</style>