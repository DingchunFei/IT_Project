<template>
  <div>
    <el-card class="richText">
        <el-container style="height: 100%">
          <el-main>
            <el-row :gutter="20">

              <el-col :span="5">
                <div>
                  <div>
                    <el-avatar
                            icon="el-icon-user-solid"
                            :size="200"
                            shape="square"
                            fit="fill"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    ></el-avatar>
                  </div>
                </div>
              </el-col>

              <el-col :span="16">
                <el-row :gutter="20">
                  <el-col :span="16">
                    <div>
                      <h1>{{tabContent.firstName}} {{tabContent.lastName}}</h1>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <div v-html="tabContent.details">
                  </div>
                </el-row>
              </el-col>

              <el-col :span="3" :gutter="20">
                <el-row>
                  <h1>Links</h1>
                </el-row>
                <el-row>
                  <div>
                    {{tabContent.links.github}}
                  </div>
                </el-row>
                <el-row>
                  <div>
                    {{tabContent.links.linkedin}}
                  </div>
                </el-row>
                <el-row>
                  <h1>Contact</h1>
                </el-row>
                <el-row>
                  <div>
                    {{tabContent.email}}
                  </div>
                </el-row>
                <el-row>
                  <h1>Attachment</h1>
                </el-row>
                <el-row>
                  <div>
                    {{tabContent.attachment}}
                  </div>
                </el-row>
              </el-col>
            </el-row>
          </el-main>

          <el-footer>
            <el-col >
            </el-col>
          </el-footer>

        </el-container>
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
    name: "AboutMe",
    props : {
      tabId: String,
      tabTitle: String,
    },
    data(){
      return {
        tabContent: {},
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
        //没缓存再发送请求

        axios.get('/tab/'+id).then(res => {
          const data = res.data.data
          console.log(data)
          this.tabContent = JSON.parse(data.content)
          sessionStorage.setItem("tab"+id, JSON.stringify(data))
        })
      },
      //进入修改页面
      updateTab(){
        const _this = this
        this.$router.push({
          name: 'AboutMeEditor',
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