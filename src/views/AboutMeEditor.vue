<template>
  <div>
    <div class="edit">
      <h1>Update your {{title}} information</h1>
      <el-card class="richText">
        <el-form :rules="rules"
                 ref="AboutMeForm">
          <!--              :label-position="labelPosition"-->
          <!--              label-width="80px"-->
          <!--              :model="customer"-->
          <!--              :rules="rules"-->
          <!--              ref="ruleForm">-->
          <el-container style="height: 100%">
            <el-main>
              <el-row :gutter="20">

                <el-col :span="5">
                  <div>
                    <!--                <el-avatar-->
                    <!--                        icon="el-icon-user-solid"-->
                    <!--                        :size="200"-->
                    <!--                        shape="square"-->
                    <!--                        fit="fill"-->
                    <!--                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"-->
                    <!--                ></el-avatar>-->
                  </div>
                  <!--      头像上传        -->
                  <!--              <el-upload-->
                  <!--                      class="upload-demo"-->
                  <!--                      action="https://jsonplaceholder.typicode.com/posts/"-->
                  <!--                      :on-preview="handlePreview"-->
                  <!--                      :on-remove="handleRemove"-->
                  <!--                      :before-remove="beforeRemove"-->
                  <!--                      multiple-->
                  <!--                      :limit="3"-->
                  <!--                      :on-exceed="handleExceed"-->
                  <!--                      :file-list="fileList">-->
                  <!--                <el-button size="small" type="primary">Upload your avatar</el-button>-->
                  <!--                <div slot="tip" class="el-upload__tip">Only jpg/png files without exceeding 500kb are available</div>-->
                  <!--              </el-upload>-->
                  <div class="el-upload">
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" >
                      </i>
                    </el-upload>
                  </div>
                </el-col>

                <el-col :span="16">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="First Name" prop="name">
                        <el-input v-model="content.firstName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="Last Name" prop="name">
                        <el-input v-model="content.lastName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <div>
                      <Editor
                          v-model="content.details"
                          ref="detailsEditor"
                      />
                    </div>
                  </el-row>
                </el-col>

                <el-col :span="3" :gutter="20">
                  <el-row>
                    <el-form-item label="GitHub" prop="links">
                      <el-input v-model="content.links.github"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="LinkedIn" prop="links">
                      <el-input v-model="content.links.linkedin"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="Contact" prop="email">
                      <el-input v-model="content.email"></el-input>
                    </el-form-item>
                  </el-row>
<!--   row: 上传文件              -->
                  <el-row>
                    <el-form-item label="Attachment" prop="attachment">
                      <el-upload
                          class="upload-demo"
                          action=""
                          :http-request = "onUpload"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :on-success="handleSuccess"
                          :before-upload="beforeUploadFile"
                          :before-remove="beforeRemove"
                          multiple
                          :limit="3"
                          :on-exceed="handleExceed"
                          :file-list="content.attachment">
                        <el-button size="small" type="primary">Upload your files</el-button>
                        <div slot="tip" class="el-upload__tip">Only 3 files, and not exceeding 500kb for each.</div>
                      </el-upload>
                    </el-form-item>
                  </el-row>

                </el-col>
              </el-row>
            </el-main>

            <el-footer>
              <el-col >
                <el-form-item >
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-button-group>
                      <el-button type="primary" @click="submitForm()">Submit</el-button>
                      <el-button @click="goHome()">Cancel</el-button>
                    </el-button-group>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-footer>

          </el-container>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from "axios";
  import Editor from '@/components/TextEditor'
  import utils from "../common/utils";

  class Item {
    constructor(fileName, fileId) {
      this.name = fileName
      this.url = fileId
    }
  }

  export default {
    name: 'AboutMeEditor',
    components: {
      Editor
    },
    data(){
      return {
        title: 'AboutMe',
        tabId: '',
        //用户详情
        content:{
          avatar: '',
          firstName:'',
          lastName:'',
          links: {
            github: '',
            linkedin: '',
          },
          email:'',
          details:'',
          attachment: [],
        },
        //头像地址
        // fileList: [],
        imageUrl: '',
        fileList:
          [
            // {
            //   name: 'food.jpeg',
            //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            // },
            // {name: 'food2.jpeg',
            //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            // }
          ],
        rules:{
          name:[
            { required: false, message: 'Please enter your name', trigger: 'blur' }
          ],
          phone:[
            { required: false, message: 'Please enter your phone number', trigger: 'blur' }
          ],
          email:[
            { required: false, message: 'Please enter your email', trigger: 'blur' }
          ],
          details:[
            { required: false, message: 'Please enter your brief introduction', trigger: 'blur' }
          ],
        }
      }
    },
    created() {
      this.tabId = this.$route.params.tabId
      utils.readAboutMeContent(this.tabId).then(res => {
        const _this = this
        const content = JSON.parse(res.content);
        // console.log(content)
        //取得数据源
        const form = this.content
        const editor = this.$refs.detailsEditor

        //标题
        this.title = res.title
        //头像
        form.avatar = content.avatar
        utils.readImage(form.avatar).then(res => {
          //解析图像Blob数据
          _this.imageUrl = URL.createObjectURL(res)
          console.log("image: "+_this.imageUrl)
        })
        //名字
        form.firstName = content.firstName
        form.lastName = content.lastName
        form.links = content.links
        //邮箱
        form.email = content.email
        //文件
        if(content.attachment != null && content.attachment != ''){
          form.attachment = content.attachment
          console.log("attach: ",content.attachment)
        }
        //编辑器内容
        form.details = content.details
        editor.content = content.details
        // console.log(form)
      })

    },
    methods: {
      submitForm(){
        // console.log(this.$refs.detailsEditor.content)
        const _this = this
        //数据源
        const form  = this.content
        const editor = this.$refs.detailsEditor
        //获取数据
        form.details = editor.content
        // console.log("submitForm:", JSON.stringify(_this.content))

        return axios.post('/tab/'+_this.tabId, {title: _this.title, content: JSON.stringify(_this.content)}).then(res => {
          console.log(res)
          sessionStorage.removeItem("tab"+_this.tabId)
          this.goHome()
        })
      },
      goHome(){
        this.$router.push("/Home");
      },

      //头像上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('Only JPG is available!');
          return
        }
        if (!isLt2M) {
          this.$message.error('The size of image should not exceed 2MB!');
          return
        }

        // console.log(file)
        let fd = new FormData()
        fd.append('picture', file)
        // console.log(fd)

        let _this = this
        let name = ''

        utils.createImage(fd).then(res => {
          name = res
          utils.readImage(res).then(res => {
            //解析图像Blob数据
            _this.imageUrl = URL.createObjectURL(res)
            //头像文件名
            _this.content.avatar = name;
          })
        })

        return isJPG && isLt2M;
      },

      //上传文件
      handleRemove(file, fileList) {
        console.log("handleRemove", file, fileList);
        let arr = this.content.attachment
        for(let i = 0; i < arr.length; i++){
          if(arr[i].url === file.url){
            console.log("find", arr[i])
            arr.splice(i, 1)
          }
        }
      },
      handlePreview(file) {
        console.log("handlePreview", this.content.attachment);
        console.log("handlePreview", file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`Do not exceed 3 files. Now you are selecting ${files.length} files，you have selected ${files.length + fileList.length} files`);
      },
      beforeRemove(file, fileList) {
        console.log("beforeRemove",fileList)
        return this.$confirm(`Are your sure to remove ${ file.name } ?`);
      },
      beforeUploadFile(file){
        console.log("beforeUploadFile",file)
        const isLt500kb = file.size / 1024 < 500;
        if (!isLt500kb) {
          this.$message.error('The size of file should not exceed 500kb!')
          return isLt500kb
        }
        return true
      },
      onUpload(data){
        let _this = this
        let file = data.file
        let fd = new FormData()
        let fileId = ''
        fd.append('picture', file)
        utils.createFile(fd).then(res => {
          fileId = res
          let item = new Item(file.name, fileId)
          _this.content.attachment.push(item)
          console.log("onUpload: ", res)
          console.log("onUpload: ", _this.content.attachment)
          // utils.readImage(res).then(res => {
          //   //解析图像Blob数据
          //   _this.imageUrl = URL.createObjectURL(res)
          //   //头像文件名
          //   _this.content.avatar = name;
          // })
        })
      },
      handleSuccess(res, file, fileList){
        console.log("handleSuccess: ", fileList)
      },
    }
  }

</script>

<style scoped>
  .richText{
    width: 100%;
    height: 100%;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>