<template>
  <div>
    <div class="profile">
      <el-card>
        <div>
          <el-row>
<!--col: avatar buttons-->
            <el-col :span="8">
<!--   row: 头像           -->
              <el-row>
                <div class="el-upload">
                  <el-upload v-if="isEditable"
                      class="avatar-uploader"
                      action=""
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl"
                         :src="imageUrl"
                         class="avatar">
                    <i v-else
                       class="el-icon-plus avatar-uploader-icon" >
                    </i>
                  </el-upload>
                  <div v-else
                       class="avatar">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <el-avatar v-else class="el-icon-user-solid avatar-uploader-icon"
                               fit="fill"
                               shape="square">
                    </el-avatar>
                  </div>
                </div>
              </el-row>
<!--     row: theme selector         -->
              <el-row type="flex" justify="center">
                <el-col :span="8">
                  <div>
                    <ThemePicker :theme="profile.theme" />
                  </div>
                </el-col>
              </el-row>
<!--row: buttons-->
              <el-row type="flex" justify="center">
                <el-col :span="8">
                  <div>
                    <el-button v-if="isEditable" type="primary" @click="submitForm">
                      Submit
                    </el-button>
                    <el-button v-else type="primary" @click="onEdit">
                      Edit
                    </el-button>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div>
                    <el-button v-if="isEditable" type="primary" @click="cancel">
                      Cancel
                    </el-button>
                    <el-button v-else type="primary" @click="goHome">
                      Home
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </el-col>

<!--col: name-->
            <el-col :span="12">
<!--     row: First name-->
              <el-row>
                <el-col :span="6">
                  <div>First name: </div>
                </el-col>
                <el-col :span="6">
                  <el-input v-if="isEditable" v-model="profile.firstName" placeholder="Please enter your first name"></el-input>
                  <div v-else> {{profile.firstName}} </div>
                </el-col>
              </el-row>

<!--    row: Last name-->
              <el-row>
                <el-col :span="6">
                  <div>Last name: </div>
                </el-col>
                <el-col :span="6">
                  <el-input v-if="isEditable" v-model="profile.lastName" placeholder="Please enter your last name"></el-input>
                  <div v-else> {{profile.lastName}} </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import ThemePicker from "../components/ThemePicker";
  import utils from "../common/utils";
  export default {
    name: "Profile",
    components: {
      ThemePicker,
    },
    data(){
      return{
        imageUrl: '',
        isEditable: false,
        profile: {
          firstName: '',
          lastName: '',
          avatar: '',
          theme: '#409EFF',
        },
      }
    },
    methods: {
      //theme改变后获取theme
      onThemeChange(theme){
        this.profile.theme = theme
        console.log(theme)
      },

      //编辑
      onEdit(){
        this.isEditable = true
      },

      //取消编辑
      cancel(){
        this.isEditable = false
      },

      //回主页
      goHome(){
        this.$router.push("/Home");
      },

      submitForm(){
        utils.updateProfile(this.profile).then(res => {
          console.log(res)
          this.cancel()
        })
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
            _this.profile.avatar = name;
          })
        })

        return isJPG && isLt2M;
      }
    },
    created() {
      utils.readProfile().then(res => {
        const profile = res.data
        this.profile.firstName = profile.first_name
        this.profile.lastName = profile.last_name
        if(profile.avatar != null && profile.avatar != ''){
          this.profile.theme = profile.theme
          utils.readImage(profile.avatar).then(res => {
            //解析图像Blob数据
            this.imageUrl = URL.createObjectURL(res)
            console.log("image: "+this.imageUrl)
          })
        }
        if(profile.theme != null && profile.theme != ''){
          this.profile.theme = profile.theme
        }
        console.log(this.profile.theme)
        console.log(profile)
      })
    },
  }
</script>

<style scoped>
  .profile{
    text-align: center;
  }
  .el-row {
    margin-bottom: 20px;
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