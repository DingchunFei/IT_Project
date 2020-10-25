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
                      :src="imageUrl"
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
                <div v-for="item in attachment" :key="item.url" @click="downloadFile(item.name, item.url)">
                  <i class="el-icon-tickets"></i>  {{item.name}} <i class="el-icon-download"></i>
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

      <el-button type="primary" @click="updateTab()">
        Update
      </el-button>
    </el-card>
  </div>
</template>

<script>
  // import axios from "axios";
  import utils from "../common/utils";
  export default {
    name: "AboutMe",
    props : {
      tabId: String,
      tabTitle: String,
    },
    data(){
      return {
        tabContent: {},
        imageUrl: '',
        attachment: []
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
        utils.readAboutMeContent(id).then(res => {
          this.tabContent = JSON.parse(res.content)
          console.log("content: ", this.tabContent)
          if(typeof this.tabContent.attachment != 'undefined'
            && this.tabContent.attachment != null
            && this.tabContent.attachment != ""){
            this.attachment = this.tabContent.attachment
          }
          utils.readImage(this.tabContent.avatar).then(res => {
            //解析图像Blob数据
            this.imageUrl = URL.createObjectURL(res)
          })
        })
        // axios.get('/tab/'+id).then(res => {
        //   const data = res.data.data
        //   console.log(data)
        //   this.tabContent = JSON.parse(data.content)
        //   sessionStorage.setItem("tab"+id, JSON.stringify(data))
        // })
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

      //下载文件
      downloadFile(fileName, fileId){
        utils.readFile(fileId).then(res => {
          console.log("downloadFile",fileName, res)
          let url = window.URL.createObjectURL(res)
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)// 文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        })
      }
    }
  }
</script>

<style scoped>
  .el-upload-list__item-status-label {
    display: none;
  }
</style>