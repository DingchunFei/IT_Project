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
  import axios from "axios";
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
        console.log(id)
        return axios.get('/tab/'+id).then(res => {
          const data = res.data.data
          const json = JSON.parse(data.content)
          this.tabContent = json.details
          console.log(data)
        })
      },
      updateTab(){
        console.log("update this tab")
      },
    }
  }
</script>

<style scoped>

</style>